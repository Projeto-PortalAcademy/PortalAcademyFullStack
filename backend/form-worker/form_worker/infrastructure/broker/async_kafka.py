import asyncio
from aiokafka import AIOKafkaProducer
from form_worker.infrastructure.broker.interface import AbstractBroker
from form_worker.infrastructure.broker.producer import Producer


class AsyncKafkaBroker(AbstractBroker):
    def __init__(self, kfk_servers: str = None, enable_idempotence: bool = None):
        self.kfk_servers = kfk_servers
        self.enable_idempotence = enable_idempotence


    def publish(self, signature: Producer) -> None:
        return asyncio.run(self.async_producer(signature=signature))

    async def async_producer(self, signature: Producer) -> None:
        producer = AIOKafkaProducer(bootstrap_servers=self.kfk_servers, enable_idempotence=self.enable_idempotence)
        await producer.start()
        try:
            await producer.send_and_wait(signature.topic, signature.message.encode('utf-8'))
        finally:
            await producer.stop()