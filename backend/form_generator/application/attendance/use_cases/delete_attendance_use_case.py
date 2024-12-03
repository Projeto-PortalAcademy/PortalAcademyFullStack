from form_generator.application.base_use_case import BaseUseCase
from form_generator.infrastructure.logger import Logger
from form_generator.services.attendance_service import AttendanceService

class DeleteAttendanceUseCase(BaseUseCase):
    def __init__(self, attendance_service: AttendanceService, logger: Logger):
        self._attendance_service = attendance_service
        self._logger = logger

    async def run(self, attendance_id: int):
        self._logger.info(f"Executing DeleteAttendanceUseCase for ID: {attendance_id}")
        await self._attendance_service.delete(attendance_id)
