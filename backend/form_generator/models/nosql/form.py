from datetime import datetime, timezone
from enum import Enum
from typing import List, Optional
from odmantic import Model, EmbeddedModel, Index, Field, Reference
from odmantic.query import asc, desc
import pymongo

class Scores(int, Enum):
    VERY_POOR = 1
    POOR = 2
    AVERAGE = 3
    GOOD = 4
    EXCELLENT = 5

class Question(Model):
    q_id: int
    text: str
    
class Response(Model):
    r_id: int
    score: Scores
    comments: Optional[str]

class Template(Model):
    title: str
    questions: List[Question]
    description: Optional[str]
    created_at: datetime = Field(default_factory=datetime.now)

    model_config = {
        "collection": "template"
    }

class EmbeddedUser(EmbeddedModel):
    user_id: str
    name: str
    email: Optional[str] = None
    photo: Optional[str] = None
    roles: str

class Form(Model):
    answered_at: Optional[datetime] = None
    responses: Optional[List[Response]] = None
    evaluated: EmbeddedUser
    evaluator: EmbeddedUser
    template: Template = Reference()
    created_at: datetime = Field(default_factory=datetime.now)
    due_date: Optional[datetime] = None
    score: Optional[int] = None
    
    model_config = {
        "collection": "form",
        "indexes": lambda: [
            pymongo.IndexModel([("answered_at", pymongo.ASCENDING)]),
        ]
    }