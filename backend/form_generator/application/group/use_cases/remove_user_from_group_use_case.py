from form_generator.application.base_use_case import BaseUseCase
from form_generator.application.group.schemas import RemoveUserFromGroupSchema
from form_generator.infrastructure.logger import Logger
from form_generator.services.group_service import GroupService


class RemoveUserFromGroupUseCase(BaseUseCase):
    def __init__(self, group_service: GroupService, logger: Logger):
        self._group_service = group_service
        self._logger = logger

    async def run(self, user_group: RemoveUserFromGroupSchema):
        await self._group_service.delete_user_group(user_group)