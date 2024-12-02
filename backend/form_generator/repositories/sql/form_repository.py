from form_generator.models.sql.form import SQLForm
from form_generator.repositories.base_repository import SQLRepository

class SQLFormRepository(SQLRepository):
    model = SQLForm