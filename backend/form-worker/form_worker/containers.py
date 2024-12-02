from dependency_injector import containers, providers
from form_worker.config import Config
from form_worker.infrastructure.broker.async_kafka import AsyncKafkaBroker
from form_worker.infrastructure.logger import AsyncLogger
from form_worker.services.email.email_service import EmailService
import loguru

class Container(containers.DeclarativeContainer):
    config = providers.Configuration()

    async_logger = providers.Singleton(AsyncLogger)

    broker = providers.Singleton(AsyncKafkaBroker, kfk_servers=Config.BROKER_SERVER, enable_idempotence=Config.KAFKA_PRODUCER_ENABLE_IDEMPOTENCE)

    email_service = providers.Factory(EmailService)
