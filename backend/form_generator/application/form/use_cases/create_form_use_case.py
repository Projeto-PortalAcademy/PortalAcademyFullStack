from form_generator.application.base_use_case import BaseUseCase
from form_generator.application.form.schemas import CreateFormSchema
from form_generator.infrastructure.logger import Logger
from form_generator.services.form_service import FormService


class CreateFormUseCase(BaseUseCase):
    def __init__(self, form_service: FormService, logger: Logger):
        self._form_service = form_service
        self._logger = logger

    async def run(self, form_data: CreateFormSchema):
        await self._form_service.create(form_data)