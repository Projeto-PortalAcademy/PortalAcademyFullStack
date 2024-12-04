from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2AuthorizationCodeBearer
from dependency_injector.wiring import Provide
from form_generator.containers import Container
from form_generator.helpers.adapters.auth_adapter import AuthAdapter
from dependency_injector.wiring import inject, Provide

from form_generator.repositories.sql.user_repository import SQLUserRepository

oauth2_schema = OAuth2PasswordBearer(tokenUrl="token")
# authenticator = AuthAdapter("26016779977-ncd6go4kfkbfeermarclvbvndp2glaqo.apps.googleusercontent.com")

@inject
async def verify_token(
    token: str = Depends(oauth2_schema), 
    authenticator: AuthAdapter = Depends(Provide[Container.authenticator]), 
    user_repository: SQLUserRepository = Depends(Provide[Container.sql_user_repository])
):
    try:
        # Valida o token usando o AuthAdapter (tornando async se necessário)
        decoded_token = authenticator.validate_token(token)
        
        # Busca o usuário com base no e-mail no banco de dados.
        user = await user_repository.filter_by({'email': decoded_token['email']})

        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Usuário não encontrado",
                headers={"WWW-Authenticate": "Bearer"},
            )

        return {"user": user.email, "role": user.roles.value}
    
    except Exception as e:
        print(str(e))
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido",
            headers={"WWW-Authenticate": "Bearer"},
        )


ROLE_HIERARCHY = ["student", "evaluator", "admin"]


def require_role(required_role: str):
    async def role_checker(user: dict = Depends(verify_token)):
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