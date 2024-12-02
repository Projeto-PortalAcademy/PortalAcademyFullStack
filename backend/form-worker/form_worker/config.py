from os import getenv
from distutils.util import strtobool
import dotenv
dotenv.load_dotenv()


class Config:
    LOG_LEVEL = getenv('LOG_LEVEL', 'INFO')

    BROKER_SERVER = getenv('BROKER_SERVER', 'broker:29092')
    KAFKA_PRODUCER_ENABLE_IDEMPOTENCE = bool(strtobool(getenv('KAFKA_PRODUCER_ENABLE_IDEMPOTENCE', 'true')))

    EMAIL_NAME = getenv('EMAIL_NAME', 'projetoacademysenai@gmail.com')
    EMAIL_PASSWORD = getenv('EMAIL_PASSWORD', 'ract tqhz jvah eaos')

    SMTP_SERVER=getenv('SMTP_SERVER',"smtp.gmail.com")
    SMTP_PORT=getenv('SMTP_PORT', 587)
