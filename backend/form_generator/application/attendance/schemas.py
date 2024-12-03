from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel

class CreateAttendanceSchema(BaseModel):
    user_id: str
    date: datetime
    is_present: bool
    comment: Optional[str] = None

class UpdateAttendanceSchema(BaseModel):
    is_present: Optional[bool] = None
    comment: Optional[str] = None

class GetAttendanceSchema(BaseModel):
    id: int
    user_id: str
    date: datetime
    is_present: bool
    comment: Optional[str] = None

class GetAllAttendancesSchema(BaseModel):
    data: List[GetAttendanceSchema]

class DeleteAttendanceSchema(BaseModel):
    id: int