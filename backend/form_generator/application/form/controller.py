import time
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Query, Request, FastAPI
from dependency_injector.wiring import inject, Provide
from fastapi.responses import JSONResponse
from google.oauth2 import id_token
from google.auth.transport import requests

from form_generator.application.form.schemas import CreateFormSchema, UpdateFormSchema, UpdateTemplateSchema
from form_generator.application.form.use_cases.create_form_use_case import CreateFormUseCase
from form_generator.application.form.use_cases.delete_form_use_case import DeleteFormUseCase
from form_generator.application.form.use_cases.delete_template_use_case import DeleteTemplateUseCase
from form_generator.application.form.use_cases.get_all_forms_use_case import GetAllFormsUseCase
from form_generator.application.form.use_cases.get_all_templates_use_case import GetAllTemplatesUseCase
from form_generator.application.form.use_cases.get_form_use_case import GetFormUseCase
from form_generator.application.form.use_cases.update_form_use_case import UpdateFormUseCase
from form_generator.application.form.use_cases.update_template_use_case import UpdateTemplateUseCase
from form_generator.containers import Container
from form_generator.infrastructure.logger import Logger
from form_generator.middlewares.auth_middleware import require_role

router = APIRouter()

@router.post("/forms", tags=["Form"])
@inject
async def create_form(
    form_data: CreateFormSchema,
    create_form_use_case: CreateFormUseCase = Depends(Provide[Container.create_form_use_case]),
    logger: Logger = Depends(Provide[Container.logger])    
):
    await create_form_use_case.run(form_data)
    return JSONResponse(
        content={"message": "Form created"}
    )

@router.put("/forms/{form_id}", tags=["Form"])
@inject
async def update_form(
    form_id: str,
    form_data: UpdateFormSchema,
    update_form_use_case: UpdateFormUseCase = Depends(Provide[Container.update_form_use_case]),
    logger: Logger = Depends(Provide[Container.logger])
):
    updated_form = await update_form_use_case.run(form_id, form_data)
    if not updated_form:
        raise HTTPException(status_code=404, detail="Form not found or not updated")
    return {"message": "Form updated successfully"}

@router.get("/forms/{form_id}", tags=["Form"])
@inject
async def get_form(
    form_id: str,
    get_form_use_case: GetFormUseCase = Depends(Provide[Container.get_form_use_case]),
    logger: Logger = Depends(Provide[Container.logger])
):
    form = await get_form_use_case.run(form_id)
    if not form:
        raise HTTPException(status_code=404, detail="Form not found")
    return form

@router.delete("/forms/{form_id}", tags=["Form"])
@inject
async def delete_form(
    form_id: str,
    delete_form_use_case: DeleteFormUseCase = Depends(Provide[Container.delete_form_use_case]),
    logger: Logger = Depends(Provide[Container.logger])
):
    deleted = await delete_form_use_case.run(form_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Form not found or not deleted")
    return {"message": "Form deleted successfully"}


@router.get("/forms", tags=["Form"])
@inject
async def list_forms(
    request: Request,
    start_date: Optional[str] = Query(None),
    end_date: Optional[str] = Query(None),
    limit: Optional[int] = Query(100),
    offset: Optional[int] = Query(0),
    get_all_forms_use_case: GetAllFormsUseCase = Depends(Provide[Container.get_all_forms_use_case]),
    logger: Logger = Depends(Provide[Container.logger]),
    # user: dict = Depends(require_role("admin"))
):
    query_params = request.query_params.items()
    query = dict(query_params)
    form_list = await get_all_forms_use_case.run(start_date=start_date, end_date=end_date, limit=limit, offset=offset, query=query)
    return form_list

@router.get("/templates", tags=["Template"])
@inject
async def list_templates(
    request: Request,
    start_date: Optional[str] = Query(None),
    end_date: Optional[str] = Query(None),
    limit: Optional[int] = Query(100),
    offset: Optional[int] = Query(0),
    get_all_templates_use_case: GetAllTemplatesUseCase = Depends(Provide[Container.get_all_templates_use_case]),
    logger: Logger = Depends(Provide[Container.logger]),
    user: dict = Depends(require_role("admin"))
):
    query_params = request.query_params.items()
    query = dict(query_params) 
    template_list = await get_all_templates_use_case.run(start_date=start_date, end_date=end_date, limit=limit, offset=offset, query=query)
    return template_list


@router.put("/templates/{template_id}", tags=["Template"])
@inject
async def update_template(
    template_id: str,
    template_data: UpdateTemplateSchema,
    update_template_use_case: UpdateTemplateUseCase = Depends(Provide[Container.update_template_use_case]),
    logger: Logger = Depends(Provide[Container.logger])
):
    updated_template = await update_template_use_case.run(template_id, template_data)
    if not updated_template:
        raise HTTPException(status_code=404, detail="Form not found or not updated")
    return {"message": "Template updated successfully"}


@router.delete("/templates/{template_id}", tags=["Template"])
@inject
async def delete_form(
    template_id: str,
    delete_template_use_case: DeleteTemplateUseCase = Depends(Provide[Container.delete_template_use_case]),
    logger: Logger = Depends(Provide[Container.logger])
):
    deleted = await delete_template_use_case.run(template_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Form not found or not deleted")
    return {"message": "Template deleted successfully"}

def configure(app: FastAPI):
    app.include_router(router)
