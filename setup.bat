@echo off
setlocal enabledelayedexpansion

echo ===============================================
echo Verificando se a rede Docker compartilhada existe...
docker network inspect app-network >nul 2>&1
if %errorlevel% neq 0 (
    echo A rede "app-network" nao existe. Criando...
    docker network create app-network
    if %errorlevel% neq 0 (
        echo ERRO: Falha ao criar a rede "app-network".
        exit /b 1
    )
) else (
    echo Rede "app-network" ja existe.
)

echo ===============================================
echo Iniciando o front-end...
docker-compose -f docker-compose.frontend.yml up --build -d
if %errorlevel% neq 0 (
    echo ERRO: Falha ao iniciar o front-end.
    exit /b 1
)

echo ===============================================
echo Iniciando o back-end...
docker-compose -f docker-compose.backend.yml up --build -d
if %errorlevel% neq 0 (
    echo ERRO: Falha ao iniciar o back-end.
    exit /b 1
)

echo ===============================================
echo Todos os containers foram iniciados com sucesso!
docker ps
pause
