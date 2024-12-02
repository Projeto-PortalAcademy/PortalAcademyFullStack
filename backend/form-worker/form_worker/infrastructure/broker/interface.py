from abc import ABCMeta, abstractmethod
from form_worker.infrastructure.broker.producer import Producer

class AbstractBroker(metaclass=ABCMeta):

    @abstractmethod
    def publish(self, signature: Producer):
        pass

    @abstractmethod
    async def async_producer(self, signature: Producer):
        pass