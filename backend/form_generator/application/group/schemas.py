from pydantic import BaseModel, Field
from typing import Optional
import uuid

class AddUserToGroupSchema(BaseModel):
    user_id: str 
    group_id: str

class RemoveUserFromGroupSchema(BaseModel):
    user_id: str 
    group_id: str

class CreateGroupSchema(BaseModel):
    name: str = Field(..., title="Group Name", max_length=255)
    image: Optional[str] = Field(None, title="Group Image")

class UpdateGroupSchema(BaseModel):
    name: Optional[str] = Field(None, title="Group Name", max_length=255)
    image: Optional[str] = Field(None, title="Group Image")


class GroupResponse(BaseModel):
    id: str = Field(..., title="Group ID", default_factory=lambda: str(uuid.uuid4()))
    name: str = Field(..., title="Group Name", max_length=255)
    image: Optional[str] = Field(None, title="Group Image")

class CreateUserGroupSchema(BaseModel):
    user_id: str = Field(..., title="User ID")
    group_id: str = Field(..., title="Group ID")


class UserGroupResponse(BaseModel):
    user_id: str = Field(..., title="User ID")
    group_id: str = Field(..., title="Group ID")
