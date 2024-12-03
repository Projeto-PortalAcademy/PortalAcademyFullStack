@router.post("/auth/login", tags=["auth"])
def login(request: Request):
    response = request.json()
    #id_info = id_token.verify_oauth2_token(response.get('token'), google_request, '26016779977-ncd6go4kfkbfeermarclvbvndp2glaqo.apps.googleusercontent.com')

    return JSONResponse(
        content={"message": "Auth", "detail": 'data'}
    )