from form_generator.application.base_use_case import BaseUseCase
from form_generator.infrastructure.logger import Logger
from form_generator.services.group_service import GroupService
from form_generator.application.group.schemas import CreateUserGroupSchema


class AddUserToGroupUseCase(BaseUseCase):
    def __init__(self, group_service: GroupService, logger: Logger):
        self._group_service = group_service
        self._logger = logger

    async def run(self, user_group_data: CreateUserGroupSchema):
        await self._group_service.add_user_to_group(user_group_data)
