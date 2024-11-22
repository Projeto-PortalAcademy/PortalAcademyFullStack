# **Projeto Fullstack com Next.js e FastAPI**

Este projeto é composto por duas partes principais:

- **Frontend**: Desenvolvido com **Next.js**, utilizando **Tailwind CSS**, **Material UI (MUI)**, **Prettier** e **ESLint** para estilização e padronização de código.
- **Backend**: Implementado com **FastAPI**, gerenciado por **Poetry** e configurado com suporte para PostgreSQL, MongoDB e Kafka.

---

## Informações úteis:
- Execução do projeto: [Veja como executar o projeto](execução_projeto.md).
- Arquitetura utilizada: [Arquitetura e Padrões de Projeto do Sistema](arquitetura_utilizada.md).

---

## **Estrutura do Frontend**

O frontend é baseado no **Next.js**, garantindo um fluxo moderno e responsivo para a interface.

### **Estrutura de Diretórios**

```plaintext
academy-app/
├── .next/                   # Diretório gerado automaticamente pelo Next.js (build)
├── node_modules/            # Módulos instalados pelo npm
├── public/                  # Arquivos estáticos acessíveis diretamente
├── src/                     # Código principal do projeto
│   ├── app/                 # Arquivos relacionados à estrutura de rotas do Next.js
│   ├── components/          # Componentes reutilizáveis
│   ├── lib/                 # Funções auxiliares e lógica compartilhada
│   ├── public/              # Imagens e arquivos públicos internos
│   ├── services/            # Serviços e chamadas para APIs
├── .eslintrc.json           # Configuração do ESLint
├── .gitignore               # Arquivos e pastas ignorados pelo Git
├── docker-compose.yml       # Configuração do Docker Compose
├── Dockerfile               # Dockerfile para construir o frontend
├── next.config.mjs          # Configuração do Next.js
├── package.json             # Dependências e scripts do projeto
├── tailwind.config.js       # Configuração do Tailwind CSS
└── tsconfig.json            # Configuração do TypeScript para o projeto
```

### **Tecnologias Utilizadas no Frontend**

- **Next.js**: Framework React para construção de aplicações modernas.
- **Tailwind CSS**: Framework CSS utilitário para estilização rápida.
- **MUI (Material-UI)**: Biblioteca de componentes UI prontos e customizáveis.
- **Prettier**: Ferramenta de formatação de código.
- **ESLint**: Ferramenta de linting para JavaScript/TypeScript.

---

## **Estrutura do Backend**

O backend foi implementado em **Python com FastAPI**, seguindo princípios de modularidade e desacoplamento. A estrutura reflete boas práticas de desenvolvimento para um projeto escalável e organizado.

### **Estrutura de Diretórios**

```plaintext
form_generator/
├── application/           # Casos de uso e orquestração de fluxos
├── helpers/               # Funções auxiliares reutilizáveis
├── infrastructure/        # Integrações externas (Kafka, MongoDB, etc.)
├── middlewares/           # Lógica transversal, como autenticação
├── migrations/            # Arquivos de migração do banco
├── models/                # Representações de entidades (SQLAlchemy, ODMantic)
├── repositories/          # Lógica de acesso ao banco (Repository Pattern)
├── services/              # Regras de negócio e lógica do domínio
│   ├── __init__.py        # Inicialização do pacote
│   ├── alembic.ini        # Configuração para Alembic
│   ├── app.py             # Definição da aplicação FastAPI
│   ├── config.py          # Configurações globais
│   ├── containers.py      # Configuração de injeção de dependências
│   └── run_gunicorn.py    # Inicialização do servidor Gunicorn
├── tests/                 # Testes automatizados
├── .dockerignore          # Arquivos ignorados pelo Docker
├── .gitignore             # Arquivos e pastas ignorados pelo Git
├── Dockerfile             # Dockerfile para construir o backend
├── docker-compose.yml     # Configuração do Docker Compose
├── poetry.lock            # Arquivo de bloqueio do Poetry
└── pyproject.toml         # Configuração de dependências e scripts
```

### **Dependências Principais**

Listadas no `pyproject.toml`, gerenciadas pelo **Poetry**:

- **FastAPI**: Framework para construção de APIs.
- **SQLAlchemy**: ORM para manipulação de bancos relacionais.
- **Odmantic**: ODM para MongoDB.
- **Alembic**: Ferramenta de migração para bancos relacionais.
- **Aiokafka**: Biblioteca assíncrona para integração com Kafka.
- **Gunicorn**: Servidor WSGI para produção.
- **Uvicorn**: Servidor ASGI para desenvolvimento e produção.






