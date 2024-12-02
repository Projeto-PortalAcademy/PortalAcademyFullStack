from form_generator.application.base_use_case import BaseUseCase
from form_generator.infrastructure.logger import Logger
from form_generator.services.group_service import GroupService


class GetAllGroupsUseCase(BaseUseCase):
    def __init__(self, group_service: GroupService, logger: Logger):
        self._group_service = group_service
        self._logger = logger

    async def run(self, filters, limit, offset):
        groups = await self._group_service.get_all(filters, limit, offset)
        return groups