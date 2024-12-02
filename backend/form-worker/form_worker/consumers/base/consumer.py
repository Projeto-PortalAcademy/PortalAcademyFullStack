import asyncio
from aiokafka import AIOKafkaConsumer, ConsumerRecord
from form_worker.infrastructure.logger import logger

class Consumer:
    def __init__(self, broker_url: str, topic: str, group_id: str):
        self.broker_url = broker_url
        self.topic = topic
        self.group_id = group_id

    async def _process_message(self, message: str) -> None:
        raise NotImplementedError("This method was not implemented!")

    def _record2str(self, record: ConsumerRecord) -> str:
        message = record.value.decode('utf-8')
        return message

    def run(self) -> None:
        asyncio.run(self._consumer_loop())

    async def _consumer_loop(self) -> None:
        consumer = AIOKafkaConsumer(
                    self.topic,
                    bootstrap_servers=self.broker_url,
                    group_id=self.group_id,
                    enable_auto_commit=True,
                    auto_offset_reset='earliest'
                )
        try:
            await consumer.start()

            while True:
                msg = await consumer.getone()
                message_decoded = self._record2str(msg)
                await self._process_message(message_decoded)
        except Exception as e:
            logger.error(e)

        finally:
            await consumer.stop()