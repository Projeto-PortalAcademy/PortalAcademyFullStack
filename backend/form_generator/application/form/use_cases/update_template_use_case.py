from form_generator.application.base_use_case import BaseUseCase
from form_generator.infrastructure.logger import Logger
from form_generator.services.form_service import FormService
from form_generator.application.form.schemas import UpdateTemplateSchema

class UpdateTemplateUseCase(BaseUseCase):
    def __init__(self, form_service: FormService, logger: Logger):
        self._form_service = form_service
        self._logger = logger

    async def run(self, template_id: str, template_data: UpdateTemplateSchema):
        return await self._form_service.update_template(template_id, template_data)