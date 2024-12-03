from form_generator.models.sql import Group
from form_generator.repositories.base_repository import SQLRepository

class SQLGroupRepository(SQLRepository):
    model = Group