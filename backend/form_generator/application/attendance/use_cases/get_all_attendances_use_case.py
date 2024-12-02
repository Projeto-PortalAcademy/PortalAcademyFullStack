from form_generator.application.base_use_case import BaseUseCase
from form_generator.infrastructure.logger import Logger
from form_generator.services.attendance_service import AttendanceService

class GetAllAttendancesUseCase(BaseUseCase):
    def __init__(self, attendance_service: AttendanceService, logger: Logger):
        self._attendance_service = attendance_service
        self._logger = logger

    async def run(self, filters, limit: int, offset: int):
        return await self._attendance_service.get_all(filters, limit=limit, offset=offset)
