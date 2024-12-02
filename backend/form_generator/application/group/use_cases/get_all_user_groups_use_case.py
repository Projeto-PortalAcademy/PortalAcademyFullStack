from form_generator.application.base_use_case import BaseUseCase
from form_generator.infrastructure.logger import Logger
from form_generator.services.group_service import GroupService


class GetAllUserGroupsUseCase(BaseUseCase):
    def __init__(self, group_service: GroupService, logger: Logger):
        self._group_service = group_service
        self._logger = logger

    async def run(self, filters, limit, offset):
        user_groups = await self._group_service.get_all_user_groups(filters, limit, offset)
        return user_groups