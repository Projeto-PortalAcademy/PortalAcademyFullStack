# Estrutura Geral da API

## 1. Formulários
- Endpoint responsável pela criação e gerenciamento de formulários.
- Funcionalidades:
  - Criar um formulário usando:
    - Um template já existente.
    - Um novo formulário do zero.
  - Gerar um link externo para que um avaliador possa responder ao formulário.
- Usuários associados:
  - Avaliado: Usuário alvo do formulário.
  - Avaliador: Usuário externo que responde ao formulário via link gerado.

## 2. Templates
- Endpoint para gerenciar formulários salvos como templates.
- Funcionalidades:
  - Reutilizar templates para criar novos formulários.
  - Atualizar ou remover templates antigos.

## 3. Formulários-Histórico
- Endpoint para visualizar, filtrar e buscar formulários já respondidos.
- Funcionalidades:
  - Filtrar por avaliado ou avaliador.
  - Exibir respostas completas e enviar novas respostas.

---

## Endpoints e Rotas da API

### 1. Formulários
- **POST /formularios**
  - Descrição: Cria um novo formulário.
  - Parâmetros:
    - `template_id` (opcional): ID do template.
    - `perguntas`: Lista de perguntas.
    - `tipo_resposta`: Tipo de resposta (ex: múltipla escolha, texto).
    - `opcoes_resposta`: Opções de resposta, se aplicável.
    - `usuario_avaliado`: ID do usuário avaliado.
  - Resposta: ID do formulário criado e link para avaliação externa.

- **GET /formularios/{formulario_id}**
  - Descrição: Obtém um formulário específico pelo ID.

- **POST /formularios/{formulario_id}/enviar-link**
  - Descrição: Gera um link para avaliação externa.
  - Parâmetros:
    - `validade`: Tempo de validade do link.
    - `token`: Token de segurança (opcional).

### 2. Templates
- **POST /templates**
  - Descrição: Cria ou salva um formulário como template reutilizável.
  - Parâmetros:
    - `perguntas`: Lista de perguntas.
    - `tipo_resposta`: Tipo de resposta.
    - `opcoes_resposta`: Opções de resposta.

- **GET /templates**
  - Descrição: Retorna todos os templates salvos.

- **PUT /templates/{template_id}**
  - Descrição: Atualiza um template existente.

- **DELETE /templates/{template_id}**
  - Descrição: Remove um template.

### 3. Formulários-Histórico
- **GET /formularios-historico**
  - Descrição: Retorna todos os formulários respondidos com opções de filtragem.

- **GET /formularios-historico/{formulario_id}**
  - Descrição: Retorna as respostas completas de um formulário específico.

- **POST /formularios-historico/{formulario_id}/respostas**
  - Descrição: Envia respostas de um formulário respondido.

---

## Banco de Dados
### Entidades Principais
1. **Formulários**:
   - Dados: Perguntas, tipos de resposta, links, associações com usuários.
   - Estado: "Em aberto" ou "Respondido".

2. **Templates**:
   - Dados: Formulários predefinidos reutilizáveis.

3. **Respostas**:
   - Dados: Respostas associadas aos formulários.
   - Consultas por avaliador e avaliado.

---

## Autenticação e Autorização
- **Usuários Externos**:
  - Uso de tokens temporários ou links assinados com validade para segurança.
- **Usuários Autenticados**:
  - Camada de autorização para controle de acesso.

---

## UML: Diagrama de Classes

```mermaid
sequenceDiagram
    participant Usuário as Usuário Autenticado
    participant API as API
    participant Banco as Banco de Dados
    participant Avaliador as Avaliador Externo

    Usuário->>API: POST /formularios (template_id, perguntas, etc.)
    API->>Banco: Consultar template (template_id)
    Banco-->>API: Dados do template
    API->>Banco: Salvar novo formulário com perguntas e tipo_resposta
    Banco-->>API: ID do novo formulário
    API-->>Usuário: ID do formulário criado

    Usuário->>API: POST /formularios/{formulario_id}/enviar-link
    API->>Banco: Gerar token e salvar validade do link
    Banco-->>API: Link gerado com token
    API-->>Usuário: Link gerado para avaliação externa

    Avaliador->>API: Acessa link gerado (GET /formularios/{formulario_id})
    API->>Banco: Buscar perguntas e detalhes do formulário
    Banco-->>API: Dados do formulário
    API-->>Avaliador: Exibir formulário para resposta

    Avaliador->>API: POST /formularios-historico/{formulario_id}/respostas
    API->>Banco: Armazenar respostas e associar ao formulário
    Banco-->>API: Confirmação de armazenamento
    API-->>Avaliador: Confirmação de envio

