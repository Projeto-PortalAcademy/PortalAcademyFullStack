from form_generator.application.base_use_case import BaseUseCase
from form_generator.infrastructure.logger import Logger
from form_generator.services.user_service import UserService
from form_generator.application.user.schemas import GetUserSchema

class GetUserUseCase(BaseUseCase):
        def __init__(self, user_service: UserService, logger: Logger):
            self._user_service = user_service
            self._logger = logger

        async def run(self, user_id: str):
            user = await self._user_service.get_by_id(user_id)
            return user