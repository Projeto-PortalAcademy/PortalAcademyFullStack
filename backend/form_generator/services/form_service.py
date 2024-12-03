from datetime import datetime
import json
from bson import ObjectId
from form_generator.application.form.schemas import CreateFormSchema, UpdateFormSchema
from form_generator.infrastructure.broker.interface import AbstractBroker
from form_generator.infrastructure.broker.producer import Producer
from form_generator.infrastructure.logger import Logger
from form_generator.models.nosql.form import Form, Template
from form_generator.models.sql.user import User
from form_generator.repositories.base_repository import NoSQLRepository, SQLRepository

class FormService:
    def __init__(
        self, 
        nosql_form_repository: NoSQLRepository, 
        nosql_template_repository: NoSQLRepository, 
        sql_form_repository: SQLRepository, 
        sql_template_repository: SQLRepository, 
        user_repository: SQLRepository,
        broker: AbstractBroker, logger: Logger
    ) -> None:
        self._nosql_form_repository = nosql_form_repository
        self._nosql_template_repository = nosql_template_repository
        self._sql_form_repository = sql_form_repository
        self._sql_template_repository = sql_template_repository
        self._user_repository = user_repository
        self._broker = broker
        self._logger = logger

    async def send_message_to_send_email(self, topic_name: str, message: str):
        signature = Producer(topic=topic_name, message=message)
        return await self._broker.async_producer(signature=signature)
    
    @staticmethod
    def serialize_user(user: User) -> dict:
        user_dict = {
            "user_id": user.id,
            "email": user.email,
            "name": user.name,
            "photo": user.photo,
            "roles": user.roles 
        }
        return user_dict

    async def create(self, form_data: CreateFormSchema):
        evaluator = await self._user_repository.get_by_id(form_data.evaluator)
        evaluated: User = await self._user_repository.get_by_id(form_data.evaluated)
        
        form_data_dict = form_data.model_dump()

        template_id = form_data.template.id

        template = await self._nosql_template_repository.get_by_id(self._str2objectid(template_id))

        if not template:
            template_data = form_data.template.model_dump(exclude={"id"})
            template = Template(**template_data)

        form_data_dict["template"] = template
        form_data_dict["evaluator"] = self.serialize_user(evaluator)
        form_data_dict["evaluated"] = self.serialize_user(evaluated)

        form = await self._nosql_form_repository.insert_one(form_data_dict)
        
        message = {
            "evaluator": form_data_dict["evaluator"]["email"],
            "form_id": str(form.id),
            "title": template.title,
            "description": template.description,
            "evaluated": form_data_dict["evaluated"]["name"],
            "duedate": str(form_data.due_date)
        }
        # # print(message)
        await self.send_message_to_send_email("send_email", json.dumps(message))

    async def get_all(self, filter: dict = {}, start_date: str = None, end_date: str = None, limit: int = 10, offset: int = 0):
        
        if start_date or end_date:
            filter["created_at"] = {}
            if start_date:
                filter["created_at"]["$gte"] = self._str2datetime(start_date)
            if end_date:
                filter["created_at"]["$lte"] = self._str2datetime(end_date)

        return await self._nosql_form_repository.get_all_paginated(filter=filter, limit=limit, offset=offset)
    
    async def get_all_templates(self, filter: dict = {}, start_date: str = None, end_date: str = None, limit: int = 10, offset: int = 0):
        
        if start_date or end_date:
            filter["created_at"] = {}
            if start_date:
                filter["created_at"]["$gte"] = self._str2datetime(start_date)
            if end_date:
                filter["created_at"]["$lte"] = self._str2datetime(end_date)

        return await self._nosql_template_repository.get_all_paginated(filter=filter, limit=limit, offset=offset)

    async def get_by_id(self, form_id: str):
        object_id = self._str2objectid(form_id)
        return await self._nosql_form_repository.get_by_id(object_id)

    async def update(self, form_id: str, form_data: UpdateFormSchema):
        form_data_dict = form_data.model_dump(exclude_unset=True)
        object_id = self._str2objectid(form_id)
        return await self._nosql_form_repository.update_one(form_data_dict, {"_id": object_id})
    
    async def update_template(self, template_id: str, template_data: UpdateFormSchema):
        template_data_dict = template_data.model_dump(exclude_unset=True)
        object_id = self._str2objectid(template_id)
        return await self._nosql_template_repository.update_one(template_data_dict, {"_id": object_id})

    async def delete_template(self, template_id: str):
        object_id = self._str2objectid(template_id)
        return await self._nosql_template_repository.delete_one({"_id": object_id})

    async def delete(self, form_id: str):
        object_id = self._str2objectid(form_id)
        return await self._nosql_form_repository.delete_one({"_id": object_id})
    
    @staticmethod
    def _str2datetime(date_str):
        return datetime.strptime(date_str, "%Y-%m-%d")

    @staticmethod
    def _str2objectid(text: str):
        return ObjectId(text)
