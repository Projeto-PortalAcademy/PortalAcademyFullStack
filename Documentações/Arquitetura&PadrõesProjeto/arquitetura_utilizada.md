# **Arquitetura e Padrões de Projeto do Sistema**

Este projeto é dividido em duas camadas principais:

1. **Frontend**: Desenvolvido com **Next.js**, utiliza um modelo moderno baseado em componentes e gerenciamento de estado, otimizando a experiência do usuário.
2. **Backend**: Implementado com **FastAPI**, utiliza uma arquitetura modular e escalável, baseada em princípios de Clean Architecture e Domain-Driven Design (DDD).

---

## **Arquitetura do Frontend**

O frontend foi projetado com **Next.js**, seguindo o modelo de **SPA/SSR (Single Page Application com Server-Side Rendering)**. A arquitetura prioriza a separação de responsabilidades, facilidade de manutenção e reutilização de código.

### **Modelo Utilizado**
- **Component-Based Architecture**: Cada elemento da interface é desenvolvido como um componente reutilizável e modular.
- **Gerenciamento de Estado Local e Global**:
  - Estado local gerenciado diretamente dentro de componentes.
  - Estado global gerenciado utilizando bibliotecas como Context API, Redux ou Zustand (conforme necessidade).
- **Estilização Modular**:
  - Utiliza **Tailwind CSS** para estilização rápida e **Material UI (MUI)** para componentes de design prontos.

### **Padrões de Projeto**
- **Atomic Design**:
  - **Átomos**: Botões, campos de texto.
  - **Moléculas**: Combinações de átomos, como formulários.
  - **Organismos**: Blocos maiores, como cabeçalhos ou painéis de navegação.
- **Service Layer**:
  - Todas as chamadas à API são abstraídas em arquivos dentro de `services/`, garantindo um único ponto de integração entre frontend e backend.

### **Estrutura do Frontend**

```plaintext
academy-app/
├── src/
│   ├── app/                 # Configuração de rotas e estrutura de páginas
│   ├── components/          # Componentes reutilizáveis
│   ├── lib/                 # Lógica compartilhada e funções auxiliares
│   ├── public/              # Imagens e arquivos estáticos
│   ├── services/            # Funções para comunicação com APIs
│   └── styles/              # Configuração do Tailwind e estilos globais
├── .eslintrc.json           # Configuração do ESLint
├── tailwind.config.js       # Configuração do Tailwind CSS
└── next.config.mjs          # Configuração do Next.js
```

---

## **Arquitetura do Backend**

O backend segue os princípios da **Clean Architecture** e **Domain-Driven Design (DDD)**, garantindo modularidade, escalabilidade e separação clara de responsabilidades.

### **Modelo Utilizado**
- **Clean Architecture**:
  - A lógica de negócio é isolada em serviços, sem depender diretamente da infraestrutura (banco de dados, APIs externas, etc.).
- **DDD (Domain-Driven Design)**:
  - Define **modelos de domínio** claros, representados em `models/`, e **repositórios** para abstrair a lógica de acesso ao banco de dados.
- **Camadas do Backend**:
  - **Camada de Rotas (Controllers)**:
    - Recebe e processa as requisições HTTP.
    - Define os endpoints da API.
  - **Camada de Serviços (Service Layer)**:
    - Contém as regras de negócio.
    - Orquestra fluxos de lógica de aplicação.
  - **Camada de Repositórios (Repository Pattern)**:
    - Centraliza o acesso ao banco de dados.
    - Abstrai consultas e comandos SQL/MongoDB.

### **Padrões de Projeto**
- **Repository Pattern**:
  - Implementado na pasta `repositories/`, centralizando o acesso ao banco de dados (PostgreSQL e MongoDB).
- **Service Pattern**:
  - A lógica de negócios está organizada em `services/`, garantindo que as rotas permaneçam simples e focadas apenas em controlar as requisições.
- **Dependency Injection**:
  - Utiliza a biblioteca `dependency-injector` para desacoplar componentes e facilitar testes.
- **Middleware Pattern**:
  - Lida com preocupações transversais, como autenticação e validação de entrada.

### **Estrutura do Backend**

```plaintext
form_generator/
├── application/           # Casos de uso e orquestração de fluxos
├── helpers/               # Funções auxiliares reutilizáveis
├── infrastructure/        # Integrações externas (Kafka, MongoDB, etc.)
├── middlewares/           # Middleware para validação e autenticação
├── migrations/            # Migrações do banco de dados (Alembic)
├── models/                # Modelos de domínio (SQLAlchemy e ODMantic)
├── repositories/          # Acesso ao banco de dados (Repository Pattern)
├── services/              # Regras de negócio e lógica do domínio
│   ├── __init__.py        # Inicialização do pacote
│   ├── alembic.ini        # Configuração para Alembic
│   ├── app.py             # Inicialização do FastAPI
│   ├── config.py          # Configurações globais
│   ├── containers.py      # Configuração de injeção de dependências
│   └── run_gunicorn.py    # Inicialização do servidor Gunicorn
├── tests/                 # Testes automatizados
├── Dockerfile             # Dockerfile para o backend
├── docker-compose.yml     # Configuração do Docker Compose
└── pyproject.toml         # Gerenciamento de dependências com Poetry
```

---

## **Fluxo Arquitetural**

1. **Frontend (Next.js)**:
   - O usuário interage com o frontend.
   - As interações acionam chamadas para a API do backend.

2. **Backend (FastAPI)**:
   - O backend recebe as requisições e valida os dados.
   - Processa as regras de negócio (em `services/`) e interage com os bancos de dados via `repositories/`.

3. **Integração Frontend ↔ Backend**:
   - A comunicação entre frontend e backend segue o padrão **RESTful API**.
   - O backend utiliza PostgreSQL e MongoDB para persistir dados e Kafka para comunicação assíncrona.

