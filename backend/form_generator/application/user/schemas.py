from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, Field
from form_generator.models.sql.user import Role


class CreateUserSchema(BaseModel):
    name: str
    email: Optional[str] = None
    roles: Role
    photo: Optional[str] = None

class UpdateUserSchema(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    photo: Optional[str] = None
    roles: Optional[Role] = None

class GetUserSchema(BaseModel):
    id: int
    name: str
    email: Optional[str] = None
    photo: Optional[str] = None
    roles: Role

class GetAllUsersSchema(BaseModel):
    data: List[GetUserSchema]

class DeleteUserSchema(BaseModel):
    id: int