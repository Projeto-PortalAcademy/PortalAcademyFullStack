from form_generator.application.attendance.schemas import UpdateAttendanceSchema
from form_generator.application.base_use_case import BaseUseCase
from form_generator.infrastructure.logger import Logger
from form_generator.services.attendance_service import AttendanceService

class UpdateAttendanceUseCase(BaseUseCase):
    def __init__(self, attendance_service: AttendanceService, logger: Logger):
        self._attendance_service = attendance_service
        self._logger = logger

    async def run(self, attendance_id: int, attendance_data: UpdateAttendanceSchema):
        await self._attendance_service.update(attendance_id, attendance_data)
