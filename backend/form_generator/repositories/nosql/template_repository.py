from form_generator.models.nosql.form import Template
from form_generator.repositories.base_repository import NoSQLRepository


class NoSQLTemplateRepository(NoSQLRepository):
    model = Template