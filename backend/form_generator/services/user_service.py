from datetime import datetime
import json
from bson import ObjectId
from form_generator.application.form.schemas import CreateFormSchema, UpdateFormSchema
from form_generator.application.user.schemas import CreateUserSchema, UpdateUserSchema
from form_generator.infrastructure.broker.interface import AbstractBroker
from form_generator.infrastructure.broker.producer import Producer
from form_generator.infrastructure.logger import Logger
from form_generator.models.nosql.form import Form, Template
from form_generator.models.sql.user import User
from form_generator.repositories.base_repository import NoSQLRepository, SQLRepository
from sqlalchemy.orm import Query

class UserService:
    def __init__(self, user_repository: SQLRepository, logger: Logger) -> None:
        self._user_repository = user_repository
        self._logger = logger

    async def create(self, user_data: CreateUserSchema):
        user_data_dict = user_data.model_dump()
        return await self._user_repository.create(user_data_dict)

    async def get_all(self, query, limit: int, offset: int):
        return await self._user_repository.paginate(query, limit, offset)

    async def update(self, user_id: str, user_data: UpdateUserSchema):
        user_data_dict = user_data.model_dump(exclude_unset=True)
        return await self._user_repository.update(user_id, user_data_dict)

    async def delete(self, user_id: str):
        return await self._user_repository.delete_by_id(user_id)

    async def get_by_id(self, user_id: str):
        return await self._user_repository.get_by_id(user_id)