from form_generator.models.sql.user import User
from form_generator.repositories.base_repository import SQLRepository

class SQLUserRepository(SQLRepository):
    model = User