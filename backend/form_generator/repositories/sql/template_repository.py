from form_generator.models.sql.form import SQLTemplate
from form_generator.repositories.base_repository import SQLRepository

class SQLTemplateRepository(SQLRepository):
    model = SQLTemplate