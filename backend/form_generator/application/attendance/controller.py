import time
from fastapi import APIRouter, Request, FastAPI, Depends, HTTPException, Query
from typing import Optional

from dependency_injector.wiring import inject, Provide
from form_generator.containers import Container

from form_generator.application.attendance.schemas import (
    CreateAttendanceSchema,
    UpdateAttendanceSchema,
    GetAttendanceSchema,
    GetAllAttendancesSchema
)

from form_generator.application.attendance.use_cases import (
    CreateAttendanceUseCase,
    DeleteAttendanceUseCase,
    GetAttendanceUseCase,
    GetAllAttendancesUseCase,
    UpdateAttendanceUseCase
)

from fastapi.responses import JSONResponse
from form_generator.infrastructure.logger import Logger

router = APIRouter()

@router.post("/attendances", tags=["Attendance"])
@inject
async def create_attendance(
    attendance_data: CreateAttendanceSchema,
    create_attendance_use_case: CreateAttendanceUseCase = Depends(Provide[Container.create_attendance_use_case]),
    logger: Logger = Depends(Provide[Container.logger])
):
    await create_attendance_use_case.run(attendance_data)
    return {"message": "Attendance created"}

@router.delete("/attendances/{attendance_id}", tags=["Attendance"])
@inject
async def delete_attendance(
    attendance_id: int,
    delete_attendance_use_case: DeleteAttendanceUseCase = Depends(Provide[Container.delete_attendance_use_case]),
    logger: Logger = Depends(Provide[Container.logger])
):
    await delete_attendance_use_case.run(attendance_id)
    return {"message": "Attendance deleted"}

@router.get("/attendances/{attendance_id}", tags=["Attendance"])
@inject
async def get_attendance(
    attendance_id: int,
    get_attendance_use_case: GetAttendanceUseCase = Depends(Provide[Container.get_attendance_use_case]),
    logger: Logger = Depends(Provide[Container.logger])
):
    attendance = await get_attendance_use_case.run(attendance_id)
    return attendance

@router.get("/attendances", tags=["Attendance"])
@inject
async def list_attendances(
    request: Request,
    limit: Optional[int] = Query(100),
    offset: Optional[int] = Query(0),
    get_all_attendances_use_case: GetAllAttendancesUseCase = Depends(Provide[Container.get_all_attendances_use_case]),
    logger: Logger = Depends(Provide[Container.logger])
):
    query_params = request.query_params.items()

    attendances = await get_all_attendances_use_case.run(
        query_params, limit=limit, offset=offset
    )
    return attendances

@router.put("/attendances/{attendance_id}", tags=["Attendance"])
@inject
async def update_attendance(
    attendance_id: int,
    attendance_data: UpdateAttendanceSchema,
    update_attendance_use_case: UpdateAttendanceUseCase = Depends(Provide[Container.update_attendance_use_case]),
    logger: Logger = Depends(Provide[Container.logger])
):
    await update_attendance_use_case.run(attendance_id, attendance_data)
    return {"message": "Attendance updated"}

def configure(app: FastAPI):
    app.include_router(router)
