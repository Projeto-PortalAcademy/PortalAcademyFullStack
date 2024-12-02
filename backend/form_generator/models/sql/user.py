import uuid
from sqlalchemy import Column, String, Enum
from form_generator.infrastructure.database.postgres_database import Base
from enum import Enum as PyEnum

class Role(PyEnum):
    STUDENT = "student"
    EVALUATOR = "evaluator"
    ADMIN = "admin"

class User(Base):
    __tablename__ = "users"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, nullable=False)
    email = Column(String, nullable=True)
    photo = Column(String, nullable=True)
    roles = Column(Enum(Role), nullable=False)
    password = Column(String, nullable=True)
