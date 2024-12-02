import sys
from aiologger.logger import Logger as AIOLogger
from aiologger.formatters.base import Formatter
from aiologger.handlers.streams import AsyncStreamHandler
from form_worker.config import Config
from loguru import logger
logger.remove()
logger.add(sys.stderr, level=Config.LOG_LEVEL)

_log_fmt = "[%(name)s] [%(levelname)s] %(asctime)s.%(msecs)d %(message)s"
_log_datefmt = "%Y-%m-%d %H:%M:%S"

class AsyncLogger(AIOLogger):
    def __init__(self) -> None:
        super().__init__(level=Config.LOG_LEVEL)
        formatter = Formatter(fmt=_log_fmt, datefmt=_log_datefmt)
        default_handler = AsyncStreamHandler(level=Config.LOG_LEVEL, formatter=formatter)
        self.add_handler(default_handler)
