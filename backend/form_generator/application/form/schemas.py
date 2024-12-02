from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, Field
from enum import Enum

class Scores(int, Enum):
    VERY_POOR = 1
    POOR = 2
    AVERAGE = 3
    GOOD = 4
    EXCELLENT = 5

class QuestionSchema(BaseModel):
    q_id: int
    text: str

class TemplateSchema(BaseModel):
    id: Optional[str] = None
    title: str
    questions: List[QuestionSchema]
    description: Optional[str] = None

class ResponseSchema(BaseModel):
    r_id: int
    score: Scores
    comments: Optional[str] = None

class CreateFormSchema(BaseModel):
    answered_at: Optional[datetime] = None
    responses: Optional[List[ResponseSchema]] = None
    evaluated: str
    evaluator: str
    template: TemplateSchema
    due_date: Optional[datetime] = None

class UpdateQuestionSchema(BaseModel):
    q_id: Optional[int] = None
    text: Optional[str] = None

class UpdateTemplateSchema(BaseModel):
    id: Optional[str] = None
    title: Optional[str] = None
    questions: Optional[List[UpdateQuestionSchema]] = None
    description: Optional[str] = None

class UpdateFormSchema(BaseModel):
    answered_at: Optional[datetime] = None
    responses: Optional[List[ResponseSchema]] = None
    due_date: Optional[datetime] = None

    class Config:
        json_schema_extra = {
            "example": {
                "answered_at": "2024-11-08T10:00:00Z",
                "responses": [
                    {
                        "r_id": 1,
                        "score": 4,
                        "comments": "Muito bom!"
                    }
                ],
                "evaluated": "John Doe",
                "evaluator": "Jane Doe",
                "due_date": "2024-11-08T10:00:00Z"
            }
        }