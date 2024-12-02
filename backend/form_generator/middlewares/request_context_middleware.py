from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2AuthorizationCodeBearer
from dependency_injector.wiring import Provide
from form_generator.containers import Container
from form_generator.helpers.adapters.auth_adapter import AuthAdapter

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
authenticator = AuthAdapter("26016779977-ncd6go4kfkbfeermarclvbvndp2glaqo.apps.googleusercontent.com")

def verify_token(token: str = Depends(oauth2_scheme), authenticator: AuthAdapter = Depends(authenticator)):
    try:
        print(token)
        decoded_token = authenticator.validate_token(token)
        print(decoded_token)
        return {"user": "admin", "role": "admin"}
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido",
            headers={"WWW-Authenticate": "Bearer"},
        )

ROLE_HIERARCHY = ["student", "evaluator", "admin"]

def require_role(required_role: str):
    def role_checker(user: dict = Depends(verify_token)):
        user_role = user.get("role")
        if not user_role:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Role não encontrada no token"
            )
        # Verifica se a role do usuário está no mesmo nível ou acima na hierarquia
        if ROLE_HIERARCHY.index(user_role) < ROLE_HIERARCHY.index(required_role):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Acesso negado: necessário a role '{required_role}' ou superior",
            )
        return user
    return role_checker



# def require_role(required_role: str):
#     def role_checker(user: dict = Depends(Provide[Container.verify_token])):
#         user_role = user.get("role")
#         if not user_role:
#             raise HTTPException(
#                 status_code=status.HTTP_401_UNAUTHORIZED,
#                 detail="Role não encontrada no token"
#             )
#         # Verifica se a role do usuário está no mesmo nível ou acima na hierarquia
#         if ROLE_HIERARCHY.index(user_role) < ROLE_HIERARCHY.index(required_role):
#             raise HTTPException(
#                 status_code=status.HTTP_403_FORBIDDEN,
#                 detail=f"Acesso negado: necessário a role '{required_role}' ou superior",
#             )
#         return user
#     return role_checker