from dependency_injector import containers, providers
from form_generator.application.attendance.use_cases.create_attendance_use_case import CreateAttendanceUseCase
from form_generator.application.attendance.use_cases.delete_attendance_use_case import DeleteAttendanceUseCase
from form_generator.application.attendance.use_cases.get_all_attendances_use_case import GetAllAttendancesUseCase
from form_generator.application.attendance.use_cases.get_attendance_use_case import GetAttendanceUseCase
from form_generator.application.attendance.use_cases.update_attendance_use_case import UpdateAttendanceUseCase
from form_generator.application.form.use_cases.create_form_use_case import CreateFormUseCase
from form_generator.application.form.use_cases.delete_form_use_case import DeleteFormUseCase
from form_generator.application.form.use_cases.delete_template_use_case import DeleteTemplateUseCase
from form_generator.application.form.use_cases.get_all_forms_use_case import GetAllFormsUseCase
from form_generator.application.form.use_cases.get_all_templates_use_case import GetAllTemplatesUseCase
from form_generator.application.form.use_cases.get_form_use_case import GetFormUseCase
from form_generator.application.form.use_cases.update_form_use_case import UpdateFormUseCase
from form_generator.application.form.use_cases.update_template_use_case import UpdateTemplateUseCase
from form_generator.application.group.use_cases.add_user_to_group_use_case import AddUserToGroupUseCase
from form_generator.application.group.use_cases.create_group_use_case import CreateGroupUseCase
from form_generator.application.group.use_cases.delete_group_use_case import DeleteGroupUseCase
from form_generator.application.group.use_cases.get_all_user_groups_use_case import GetAllUserGroupsUseCase
from form_generator.application.group.use_cases.remove_user_from_group_use_case import RemoveUserFromGroupUseCase
from form_generator.application.group.use_cases.get_all_group_use_case import GetAllGroupsUseCase
from form_generator.application.group.use_cases.get_group_use_case import GetGroupUseCase
from form_generator.application.group.use_cases.get_user_group_use_case import GetUserGroupUseCase
from form_generator.application.group.use_cases.update_group_use_case import UpdateGroupUseCase
from form_generator.application.user.use_cases.create_user_use_case import CreateUserUseCase
from form_generator.application.user.use_cases.delete_user_use_case import DeleteUserUseCase
from form_generator.application.user.use_cases.get_all_users_use_case import GetAllUsersUseCase
from form_generator.application.user.use_cases.get_user_use_case import GetUserUseCase
from form_generator.application.user.use_cases.update_user_use_case import UpdateUserUseCase
from form_generator.config import Config
from form_generator.helpers.adapters.auth_adapter import AuthAdapter
from form_generator.infrastructure.broker.async_kafka import AsyncKafkaBroker
from form_generator.infrastructure.database.mongo_database import MongoDatabase
from form_generator.infrastructure.database.postgres_database import PostgresDatabase
from form_generator.infrastructure.logger import Logger
from form_generator.repositories.nosql.form_repository import NoSQLFormRepository, NoSQLFormRepository
from form_generator.repositories.nosql.template_repository import NoSQLTemplateRepository, NoSQLTemplateRepository
from form_generator.repositories.sql.attendance_repository import SQLAttendanceRepository
from form_generator.repositories.sql.form_repository import SQLFormRepository
from form_generator.repositories.sql.group_repository import SQLGroupRepository
from form_generator.repositories.sql.template_repository import SQLTemplateRepository
from form_generator.repositories.sql.user_group_repository import SQLUserGroupRepository
from form_generator.repositories.sql.user_repository import SQLUserRepository
from form_generator.services.attendance_service import AttendanceService
from form_generator.services.form_service import FormService
from form_generator.services.group_service import GroupService
from form_generator.services.user_service import UserService

class Container(containers.DeclarativeContainer):
    config = providers.Configuration()

    logger = providers.Singleton(Logger)

    broker = providers.Singleton(AsyncKafkaBroker, kfk_servers=Config.BROKER_SERVER, enable_idempotence=Config.KAFKA_PRODUCER_ENABLE_IDEMPOTENCE)

    mongo_database = providers.Singleton(
        MongoDatabase, database=Config.MONGO_DATABASE_DB, host=Config.MONGO_DATABASE_HOST, port=Config.MONGO_DATABASE_PORT, user=Config.MONGO_DATABASE_USER, password=Config.MONGO_DATABASE_PASSWORD
    )

    postgres_database = providers.Singleton(
        PostgresDatabase, db_url=Config.DATABASE_URL
    )

    nosql_form_repository = providers.Singleton(
        NoSQLFormRepository, session_factory=mongo_database.provided.session
    )

    nosql_template_repository = providers.Singleton(
        NoSQLTemplateRepository, session_factory=mongo_database.provided.session 
    )

    sql_form_repository = providers.Singleton(
        SQLFormRepository, session_factory=postgres_database.provided.session
    )

    sql_template_repository = providers.Singleton(
        SQLTemplateRepository, session_factory=postgres_database.provided.session
    )

    sql_user_repository = providers.Singleton(
        SQLUserRepository, session_factory=postgres_database.provided.session
    )

    sql_attendance_repository = providers.Singleton(
        SQLAttendanceRepository, session_factory=postgres_database.provided.session
    )

    sql_user_group_repository = providers.Singleton(
        SQLUserGroupRepository, session_factory=postgres_database.provided.session
    )

    sql_group_repository = providers.Singleton(
        SQLGroupRepository, session_factory=postgres_database.provided.session
    )

    user_service = providers.Factory(UserService, sql_user_repository, logger)

    get_all_users_use_case = providers.Factory(GetAllUsersUseCase, user_service, logger)

    create_user_use_case = providers.Factory(CreateUserUseCase, user_service, logger)

    get_user_use_case = providers.Factory(GetUserUseCase, user_service, logger)
    
    update_user_use_case = providers.Factory(UpdateUserUseCase, user_service, logger)

    delete_user_use_case = providers.Factory(DeleteUserUseCase, user_service, logger)

    # Auth

    authenticator = providers.Singleton(AuthAdapter, Config.GOOGLE_CLIENT_ID)

    # Form

    form_service = providers.Factory(FormService, nosql_form_repository, nosql_template_repository, sql_form_repository, sql_template_repository, sql_user_repository, broker, logger)

    get_all_forms_use_case = providers.Factory(GetAllFormsUseCase, form_service, logger)

    create_form_use_case = providers.Factory(CreateFormUseCase, form_service, logger)

    get_form_use_case = providers.Factory(GetFormUseCase, form_service, logger)
    
    update_form_use_case = providers.Factory(UpdateFormUseCase, form_service, logger)

    delete_form_use_case = providers.Factory(DeleteFormUseCase, form_service, logger)

    update_template_use_case = providers.Factory(UpdateTemplateUseCase, form_service, logger)

    delete_template_use_case = providers.Factory(DeleteTemplateUseCase, form_service, logger)

    get_all_templates_use_case = providers.Factory(GetAllTemplatesUseCase, form_service, logger)

    # Atttendance

    attendance_service = providers.Factory(AttendanceService, sql_attendance_repository, logger)

    get_all_attendances_use_case = providers.Factory(GetAllAttendancesUseCase, attendance_service, logger)

    create_attendance_use_case = providers.Factory(CreateAttendanceUseCase, attendance_service, logger)

    get_attendance_use_case = providers.Factory(GetAttendanceUseCase, attendance_service, logger)
    
    update_attendance_use_case = providers.Factory(UpdateAttendanceUseCase, attendance_service, logger)

    delete_attendance_use_case = providers.Factory(DeleteAttendanceUseCase, attendance_service, logger)

    # Group

    group_service = providers.Factory(GroupService, sql_group_repository, sql_user_group_repository, logger)

    get_all_groups_use_case = providers.Factory(GetAllGroupsUseCase, group_service, logger)

    get_all_user_groups_use_case = providers.Factory(GetAllUserGroupsUseCase, group_service, logger)

    create_group_use_case = providers.Factory(CreateGroupUseCase, group_service, logger)

    get_group_use_case = providers.Factory(GetGroupUseCase, group_service, logger)
    
    update_group_use_case = providers.Factory(UpdateGroupUseCase, group_service, logger)

    delete_group_use_case = providers.Factory(DeleteGroupUseCase, group_service, logger)

    add_user_to_group_use_case = providers.Factory(AddUserToGroupUseCase, group_service, logger)

    remove_user_from_group_use_case = providers.Factory(RemoveUserFromGroupUseCase, group_service, logger)