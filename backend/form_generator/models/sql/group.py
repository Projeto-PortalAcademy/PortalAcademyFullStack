import uuid
from sqlalchemy import Column, ForeignKey, PrimaryKeyConstraint, String
from form_generator.infrastructure.database.postgres_database import Base

class Group(Base):
    __tablename__ = "groups"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, nullable=False)
    image = Column(String, nullable=True)

class UserGroup(Base):
    __tablename__ = "users_groups"

    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    group_id = Column(String, ForeignKey("groups.id"), nullable=False)

    __table_args__ = (
        PrimaryKeyConstraint('user_id', 'group_id'),
    )