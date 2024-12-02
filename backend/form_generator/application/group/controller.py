import time
from typing import Optional
from fastapi import APIRouter, Request, FastAPI

from dependency_injector.wiring import inject, Provide
from form_generator.application.group.schemas import AddUserToGroupSchema, CreateGroupSchema, RemoveUserFromGroupSchema, UpdateGroupSchema
from form_generator.application.group.use_cases.add_user_to_group_use_case import AddUserToGroupUseCase
from form_generator.application.group.use_cases.create_group_use_case import CreateGroupUseCase
from form_generator.application.group.use_cases.delete_group_use_case import DeleteGroupUseCase
from form_generator.application.group.use_cases.get_all_group_use_case import GetAllGroupsUseCase
from form_generator.application.group.use_cases.get_all_user_groups_use_case import GetAllUserGroupsUseCase
from form_generator.application.group.use_cases.get_group_use_case import GetGroupUseCase
from form_generator.application.group.use_cases.remove_user_from_group_use_case import RemoveUserFromGroupUseCase
from form_generator.application.group.use_cases.update_group_use_case import UpdateGroupUseCase
from form_generator.containers import Container

from fastapi.responses import JSONResponse
from google.auth.transport import requests
from form_generator.infrastructure.logger import Logger
from fastapi import APIRouter, Depends, HTTPException, Query, Request, FastAPI

router = APIRouter()

@router.post("/groups", tags=["group"])
@inject
async def create_group(
    group_data: CreateGroupSchema,
    create_group_use_case: CreateGroupUseCase = Depends(Provide[Container.create_group_use_case]),
    logger: Logger = Depends(Provide[Container.logger])
):
    await create_group_use_case.run(group_data)
    return {"message": "Group created"}

@router.delete("/groups/{group_id}", tags=["group"])
@inject
async def delete_group(
    group_id: str,
    delete_group_use_case: DeleteGroupUseCase = Depends(Provide[Container.delete_group_use_case]),
    logger: Logger = Depends(Provide[Container.logger])
):
    await delete_group_use_case.run(group_id)
    return {"message": "Group deleted"}

@router.get("/groups/{group_id}", tags=["group"])
@inject
async def get_group(
    group_id: str,
    get_group_use_case: GetGroupUseCase = Depends(Provide[Container.get_group_use_case]),
    logger: Logger = Depends(Provide[Container.logger])
):
    group = await get_group_use_case.run(group_id)
    return group

@router.get("/groups", tags=["group"])
@inject
async def get_all_groups(
    request: Request,
    limit: Optional[int] = Query(100),
    offset: Optional[int] = Query(0),
    get_all_groups_use_case: GetAllGroupsUseCase = Depends(Provide[Container.get_all_groups_use_case]),
    logger: Logger = Depends(Provide[Container.logger])
):
    query_params = request.query_params.items()

    groups = await get_all_groups_use_case.run(query_params, limit, offset)
    return groups

@router.put("/groups/{group_id}", tags=["group"])
@inject
async def update_group(
    group_id: str,
    group_data: UpdateGroupSchema,
    update_group_use_case: UpdateGroupUseCase = Depends(Provide[Container.update_group_use_case]),
    logger: Logger = Depends(Provide[Container.logger])
):
    await update_group_use_case.run(group_id, group_data)
    return {"message": "Group updated"}

@router.get("/user_groups", tags=["group"])
@inject
async def get_all_user_groups(
    request: Request,
    limit: Optional[int] = Query(100),
    offset: Optional[int] = Query(0),
    get_all_user_groups_use_case: GetAllUserGroupsUseCase = Depends(Provide[Container.get_all_user_groups_use_case]),
    logger: Logger = Depends(Provide[Container.logger])
):
    query_params = request.query_params.items()
    
    groups = await get_all_user_groups_use_case.run(query_params, limit, offset)
    return groups


@router.delete("/user_groups", tags=["group"])
@inject
async def remove_user_from_group(
    user_group_data: RemoveUserFromGroupSchema,
    remove_user_from_group_use_case: RemoveUserFromGroupUseCase = Depends(Provide[Container.remove_user_from_group_use_case]),
    logger: Logger = Depends(Provide[Container.logger])
):
    await remove_user_from_group_use_case.run(user_group_data)
    return {"message": "UserGroup deleted"}

@router.post("/user_groups", tags=["group"])
@inject
async def add_user_to_group(
    user_group_data: AddUserToGroupSchema,
    add_user_to_group_use_case: AddUserToGroupUseCase = Depends(Provide[Container.add_user_to_group_use_case]),
    logger: Logger = Depends(Provide[Container.logger])
):
    await add_user_to_group_use_case.run(user_group_data)
    return {"message": "UserGroup created"}

def configure(app: FastAPI):
    app.include_router(router)