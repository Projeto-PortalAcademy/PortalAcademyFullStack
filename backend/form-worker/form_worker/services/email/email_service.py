import smtplib
import email.message
import os
from form_worker.config import Config
from email.message import EmailMessage
from aiosmtplib import send
from form_worker.infrastructure.logger import logger

class EmailService:
    def __init__(self):
        ...

    async def send_form_email(self, token: str, email_receiver: str, title: str, description: str, evaluated: str, duedate: str):
        body = (
            """
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                }

                .confirmation-container {
                    text-align: center;
                    background-color: #fff;
                    border-radius: 8px;
                    padding: 20px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }

                h1 {
                    color: #333;
                }

                p {
                    color: #666;
                    margin-bottom: 20px;
                }

                .confirmation-button {
                    display: inline-block;
                    padding: 10px 20px;
                    background-color: #4CAF50;
                    color: #fafafa;
                    text-decoration: none;
                    border-radius: 5px;
                    transition: background-color 0.3s;
                    border: none;
                }

                .confirmation-button:hover {
                    background-color: #45a049;
                    cursor: pointer;
                }
            </style>
        </head>
        <body>

            <div class="confirmation-container">
                <h1>""" + title + """</h1>
                <p>""" + description + """</p>
                <p>Avaliado: """ + evaluated + """</p>
                <p>Data limite: """ + duedate + """</p>
                <a href="https://www.example.com/confirm/""" 
        + token +
        """ 
            " class="confirmation-button">Acessar questionário</a>
        </body>
        """
        )

        msg = self._configure_html_email(body, "Questionário de avaliação", email_receiver)

        try:
            await self._send_email(msg)
        except Exception as error:
            logger.error(error)

    async def _send_email(self, msg: EmailMessage):
        logger.info(f'sending email to {msg["to"]}')
        await send(
            msg,
            hostname=Config.SMTP_SERVER,
            port=Config.SMTP_PORT,
            username=Config.EMAIL_NAME,
            password=Config.EMAIL_PASSWORD,
            use_tls=False
        )

    def _configure_html_email(self, content: str, subject: str, email_receiver: str) -> EmailMessage:
        logger.info('html email message configuration started')
        msg = EmailMessage()
        msg["Subject"] = subject
        msg["From"] = Config.EMAIL_NAME
        msg["To"] = email_receiver
        msg.add_alternative(content, subtype="html")
        return msg