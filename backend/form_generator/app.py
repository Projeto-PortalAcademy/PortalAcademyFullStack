import asyncio
from form_generator.config import Config
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from form_generator.containers import Container
from form_generator.infrastructure.database.mongo_database import MongoDatabase
from form_generator.models.nosql.form import Form, Template
# from form_generator.models.sql import User, SQLForm, SQLTemplate, Attendance
from dependency_injector.wiring import Provide
from contextlib import asynccontextmanager


async def configure_mongo_db(
    mongo_db: MongoDatabase = Provide[Container.mongo_database],
):
    async with mongo_db.session() as session:
        await session.configure_database([Template, Form])

@asynccontextmanager
async def lifespan(app: FastAPI):
    await configure_mongo_db()
    yield

def create_app() -> FastAPI:
    app = FastAPI(openapi_url="/spec", lifespan=lifespan)

    container = Container()
    
    from form_generator.application.form import controller as form_controller
    from form_generator.application.user import controller as user_controller
    from form_generator.application.group import controller as group_controller
    from form_generator.application.attendance import controller as attendance_controller

    form_controller.configure(app)
    user_controller.configure(app)
    group_controller.configure(app)
    attendance_controller.configure(app)

    container.wire(
        modules=[
            __name__, 
            form_controller,
            user_controller,
            group_controller,
            attendance_controller
        ]
    )
    
    app.add_middleware(
         CORSMiddleware,
         allow_origins=["*"],
         allow_credentials=True,
         allow_methods=["*"],
         allow_headers=["*"],
    )

    app.container = container
    
    return app


app = create_app()


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=Config.SERVER_PORT)
