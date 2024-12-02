import sys
from form_worker.config import Config
from form_worker.consumers.send_email import EmailConsumer
from form_worker.containers import Container
from form_worker.infrastructure.logger import AsyncLogger, logger
from form_worker.services.email.email_service import EmailService
from dependency_injector.wiring import Provide

CONSUMER_ARGS = ['run_email_consumer', 'run_create_form_consumer']

def choose_command_with_cmd_line(argv: list[str]) -> str | None:
    arg = argv[1]
    selected_consumer = argv[1]
    if arg not in CONSUMER_ARGS:
        logger.error(f'Invalid argument: {selected_consumer}')
        return
    logger.info(f'{argv[1]} selected')
    return selected_consumer

def run_consumers(selected_command: str, email_service: EmailService = Provide[Container.email_service]):
    run_create_form_consumer = False
    run_email_consumer = False

    if selected_command == 'run_email_consumer':
        run_email_consumer = True
    elif selected_command == 'run_create_form_consumer':
        run_create_form_consumer = True

    try:
        if run_email_consumer:
            email_consumer = EmailConsumer(broker_url=Config.BROKER_SERVER,
                                            topic="send_email",
                                            group_id="g1",
                                            service=email_service)

            email_consumer.run()

    except (KeyboardInterrupt, SystemExit):
        pass

    except Exception as e:
        logger.exception(f'Error {str(e)}')


def main(argv):
    container = Container()
    container.wire(modules=[__name__])

    selected_command = choose_command_with_cmd_line(argv=argv)
    
    run_consumers(selected_command)


if __name__ == '__main__':
    main(sys.argv)