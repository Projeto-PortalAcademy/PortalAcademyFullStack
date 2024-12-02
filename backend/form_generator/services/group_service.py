from typing import List, Optional
from form_generator.infrastructure.logger import Logger
from form_generator.repositories.sql.group_repository import SQLGroupRepository
from form_generator.repositories.sql.user_group_repository import SQLUserGroupRepository
from form_generator.application.group.schemas import CreateGroupSchema, UpdateGroupSchema, GroupResponse, UserGroupResponse
from sqlalchemy.exc import NoResultFound


class GroupService:
    def __init__(self, group_repository: SQLGroupRepository, user_group_repository: SQLUserGroupRepository, logger: Logger):
        self._group_repository = group_repository
        self._user_group_repository = user_group_repository
        self._logger = logger

    async def create(self, group_data: CreateGroupSchema) -> GroupResponse:
        group_data_dict = group_data.model_dump()
        group = await self._group_repository.create(group_data_dict)
        return group

    async def get_by_id(self, group_id: str) -> GroupResponse:
        group = await self._group_repository.get_by_id(group_id)
        return group

    async def update(self, group_id: str, group_data: UpdateGroupSchema) -> GroupResponse:
        group_data_dict = group_data.model_dump()
        group = await self._group_repository.update(group_id, group_data_dict)
        return group

    async def delete(self, group_id: str) -> None:
        return await self._group_repository.delete_by_id(group_id)

    async def get_all(self, filters, limit, offset) -> List[GroupResponse]:
        groups = await self._group_repository.paginate(filters, limit, offset)
        return groups

    async def get_all_user_groups(self, filters, limit, offset) -> List[UserGroupResponse]:
        user_groups = await self._user_group_repository.paginate(filters, limit, offset)
        return user_groups

    async def delete_user_group(self, user_group) -> None:
        user_group_dict = user_group.model_dump()
        print(user_group_dict)
        await self._user_group_repository.delete(user_group_dict)

    async def add_user_to_group(self, user_group_data) -> None: 
        user_group_data_dict = user_group_data.model_dump()
        await self._user_group_repository.create(user_group_data_dict)

    async def remove_user_from_group(self, user_id: str, group_id: str) -> None:
        association_exists = await self._user_group_repository.check_user_in_group(user_id, group_id)
        if not association_exists:
            raise ValueError(f"User with ID {user_id} is not part of the group {group_id}")

        await self._user_group_repository.remove_user_from_group(user_id, group_id)
