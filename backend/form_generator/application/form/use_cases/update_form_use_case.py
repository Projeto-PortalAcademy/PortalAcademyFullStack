from form_generator.application.base_use_case import BaseUseCase
from form_generator.infrastructure.logger import Logger
from form_generator.services.form_service import FormService
from form_generator.application.form.schemas import UpdateFormSchema

class UpdateFormUseCase(BaseUseCase):
    def __init__(self, form_service: FormService, logger: Logger):
        self._form_service = form_service
        self._logger = logger

    async def run(self, form_id: str, form_data: UpdateFormSchema):
        return await self._form_service.update(form_id, form_data)