from datetime import datetime
from sqlalchemy.orm import Query
from form_generator.infrastructure.logger import Logger
from form_generator.repositories.base_repository import SQLRepository

class AttendanceService:
    def __init__(self, attendance_repository: SQLRepository, logger: Logger) -> None:
        self._attendance_repository = attendance_repository
        self._logger = logger

    async def create(self, attendance_data):
        attendance_data_dict = attendance_data.model_dump(exclude_unset=True)
        return await self._attendance_repository.create(attendance_data_dict)

    async def get_all(self, filters, limit: int, offset: int):
        return await self._attendance_repository.paginate(filters, limit, offset)

    async def update(self, attendance_id: int, attendance_data):
            attendance_data_dict = attendance_data.model_dump(exclude_unset=True)
            return await self._attendance_repository.update(attendance_id, attendance_data_dict)

    async def delete(self, attendance_id: int):
        self._logger.info(f"Attempting to delete attendance with ID: {attendance_id}")
        try:
            return await self._attendance_repository.delete_by_id(attendance_id)
        except Exception as e:
            self._logger.error(f"Error deleting attendance with ID {attendance_id}: {str(e)}")
            raise

    async def get_by_id(self, attendance_id: int):
        self._logger.info(f"Fetching attendance by ID: {attendance_id}")
        try:
            return await self._attendance_repository.get_by_id(attendance_id)
        except Exception as e:
            self._logger.error(f"Error fetching attendance by ID {attendance_id}: {str(e)}")
            raise
