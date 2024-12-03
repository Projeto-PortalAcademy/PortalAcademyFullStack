import json
from aiokafka import ConsumerRecord
from form_worker.consumers.base.consumer import Consumer
from form_worker.services.email.email_service import EmailService
from form_worker.infrastructure.logger import logger 

class EmailConsumer(Consumer):
    def __init__(self, broker_url: str, topic: str, group_id: str, service: EmailService):
        self._service = service
        super().__init__(broker_url, topic, group_id)

    async def _process_message(self, message: str) -> None:
        logger.debug(f"message process started with content: {message}")
        message_dict = json.loads(message)
        evaluator = message_dict.get('evaluator')
        form_id = message_dict.get('form_id')
        title = message_dict.get('title')
        description = message_dict.get('description')
        evaluated = message_dict.get('evaluated')
        duedate = message_dict.get('duedate')
        
        await self._service.send_form_email(form_id, evaluator, title, description, evaluated, duedate)
        


