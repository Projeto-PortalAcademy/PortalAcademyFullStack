import time
from typing import Optional
from fastapi import APIRouter, Request, FastAPI

from dependency_injector.wiring import inject, Provide
from form_generator.containers import Container

from form_generator.application.user.schemas import (
    CreateUserSchema, 
    UpdateUserSchema
    )

from form_generator.application.user.use_cases import (
    CreateUserUseCase,
    DeleteUserUseCase,
    GetUserUseCase,
    GetAllUsersUseCase,
    UpdateUserUseCase
)
from fastapi.responses import JSONResponse
from google.auth.transport import requests
from form_generator.infrastructure.logger import Logger
from fastapi import APIRouter, Depends, HTTPException, Query, Request, FastAPI

router = APIRouter()

@router.post("/users", tags=["user"])
@inject
async def create_user(
    user_data: CreateUserSchema,
    create_user_use_case: CreateUserUseCase = Depends(Provide[Container.create_user_use_case]),
    logger: Logger = Depends(Provide[Container.logger])
):
    await create_user_use_case.run(user_data)
    return {"message": "User created"}

@router.delete("/users/{user_id}", tags=["user"])
@inject
async def delete_user(
    user_id: str,
    delete_user_use_case: DeleteUserUseCase = Depends(Provide[Container.delete_user_use_case]),
    logger: Logger = Depends(Provide[Container.logger])
):
    await delete_user_use_case.run(user_id)
    return {"message": "User deleted"}

@router.get("/users/{user_id}", tags=["user"])
@inject
async def get_user(
    user_id: str,
    get_user_use_case: GetUserUseCase = Depends(Provide[Container.get_user_use_case]),
    logger: Logger = Depends(Provide[Container.logger])
):
    user = await get_user_use_case.run(user_id)
    return user

@router.get("/users", tags=["user"])
@inject
async def get_all_users(
    request: Request,
    limit: Optional[int] = Query(100),
    offset: Optional[int] = Query(0),
    get_all_users_use_case: GetAllUsersUseCase = Depends(Provide[Container.get_all_users_use_case]),
    logger: Logger = Depends(Provide[Container.logger])
):
    query_params = request.query_params.items()

    users = await get_all_users_use_case.run(query_params, limit, offset)
    return users

@router.put("/users/{user_id}", tags=["user"])
@inject
async def update_user(
    user_id: str,
    user_data: UpdateUserSchema,
    update_user_use_case: UpdateUserUseCase = Depends(Provide[Container.update_user_use_case]),
    logger: Logger = Depends(Provide[Container.logger])
):
    await update_user_use_case.run(user_id, user_data)
    return {"message": "User updated"}


def configure(app: FastAPI):
    app.include_router(router)