from sqlalchemy import Column, String, DateTime, Integer, Date, ForeignKey
from form_generator.infrastructure.database.postgres_database import Base
from datetime import datetime

class SQLTemplate(Base):
    __tablename__ = "templates"

    id = Column(String, primary_key=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    created_by = Column(String, ForeignKey("users.id"), nullable=False)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)


class SQLForm(Base):
    __tablename__ = "forms"

    id = Column(String, primary_key=True)
    evaluator_id = Column(String, ForeignKey("users.id"), nullable=False)
    evaluated_id = Column(String, ForeignKey("users.id"), nullable=False)
    template_id = Column(String, ForeignKey("templates.id"), nullable=False)
    answered_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    due_date = Column(Date, nullable=True)
    score = Column(Integer, nullable=False)

