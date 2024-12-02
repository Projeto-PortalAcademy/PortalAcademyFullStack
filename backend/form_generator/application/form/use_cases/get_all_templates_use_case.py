from form_generator.application.base_use_case import BaseUseCase
from form_generator.infrastructure.logger import Logger
from form_generator.services.form_service import FormService


class GetAllTemplatesUseCase(BaseUseCase):
    def __init__(self,  form_service: FormService, logger: Logger):
        self._form_service = form_service
        self._logger = logger

    async def run(self, start_date: str, end_date: str, limit: int, offset: int, query: dict = {}):
        return await self._form_service.get_all_templates(start_date=start_date, end_date=end_date,
                                        limit=limit, offset=offset, filter=query)