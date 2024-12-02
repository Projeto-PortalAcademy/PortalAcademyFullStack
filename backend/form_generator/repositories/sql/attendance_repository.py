from sqlalchemy import select
from form_generator.models.sql.attendance import Attendance
from form_generator.repositories.base_repository import SQLRepository

class SQLAttendanceRepository(SQLRepository):
    model = Attendance

    async def paginate(self, filters, limit: int, offset: int):
        async with self.session_factory() as session:
            query = select(self.model)

            conditions = []

            if filters:
                for field, value in filters.items():
                    if hasattr(self.model, field):
                        column = getattr(self.model, field)
                        if field == "start_date" and value:  # Filtrar registros >= start_date
                            conditions.append(getattr(self.model, "date") >= value)
                        elif field == "end_date" and value:  # Filtrar registros <= end_date
                            conditions.append(getattr(self.model, "date") <= value)
                        elif isinstance(value, str):
                            conditions.append(column.ilike(f"%{value}%"))
                        else:
                            conditions.append(column == value)
            result = await session.execute(query.limit(limit).offset(offset))

        return result.scalars().all()