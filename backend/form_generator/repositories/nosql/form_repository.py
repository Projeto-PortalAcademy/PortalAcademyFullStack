from form_generator.models.nosql.form import Form
from form_generator.repositories.base_repository import NoSQLRepository


class NoSQLFormRepository(NoSQLRepository):
    model = Form