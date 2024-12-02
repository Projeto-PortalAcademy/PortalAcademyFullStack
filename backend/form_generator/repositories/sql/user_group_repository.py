from form_generator.models.sql import UserGroup
from form_generator.repositories.base_repository import SQLRepository

class SQLUserGroupRepository(SQLRepository):
    model = UserGroup