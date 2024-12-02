from form_generator.application.base_use_case import BaseUseCase
from form_generator.infrastructure.logger import Logger
from form_generator.services.group_service import GroupService


class GetUserGroupUseCase(BaseUseCase):
    def __init__(self, group_service: GroupService, logger: Logger):
        self._group_service = group_service
        self._logger = logger

    async def run(self, user_id: str):
        group = await self._group_service.get_user_group_by_user(user_id)
        return group