from sqlalchemy import Boolean, Column, Date, Integer, String, ForeignKey
from form_generator.infrastructure.database.postgres_database import Base


class Attendance(Base):
    __tablename__ = "attendances"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"), nullable=False, index=True)
    date = Column(Date, nullable=False, index=True)
    is_present = Column(Boolean, default=True)
    comment = Column(String(100), nullable=True)