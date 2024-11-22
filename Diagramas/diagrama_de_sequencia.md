```mermaid
sequenceDiagram
    autonumber
    participant User as Usuário
    participant App as Aplicativo
    participant Server as Servidor Backend
    participant DB as Banco de Dados
    participant CL as Chapter Leader

    User->>App: Login
    App->>Server: Enviar credenciais
    Server->>DB: Validar usuário
    DB-->>Server: Usuário validado
    Server-->>App: Retornar token de autenticação
    App-->>User: Login realizado

    User->>App: Registrar presença diária
    App->>Server: Enviar registro de presença
    Server->>DB: Salvar presença e observações
    DB-->>Server: Confirmação de registro
    Server-->>App: Registro realizado
    App-->>User: Presença registrada com sucesso

    User->>App: Criar formulário/questionário
    App->>Server: Enviar dados do formulário
    Server->>DB: Salvar formulário/questionário
    DB-->>Server: Confirmação de criação
    Server-->>App: Formulário/questionário criado
    App-->>User: Formulário/questionário salvo com sucesso

    User->>App: Visualizar dashboards
    App->>Server: Solicitar dados do progresso técnico, presença e feedbacks
    Server->>DB: Consultar dados dos dashboards
    DB-->>Server: Retornar dados
    Server-->>App: Enviar dados para visualização
    App-->>User: Exibir dashboards

    User->>App: Gerar relatório customizado
    App->>Server: Solicitar geração de relatório
    Server->>DB: Consultar dados (faltas, atestados, observações)
    DB-->>Server: Retornar dados do relatório
    Server-->>App: Enviar relatório gerado
    App-->>User: Relatório pronto para download

    CL->>Server: Enviar feedback técnico/comportamental
    Server->>DB: Salvar feedback
    DB-->>Server: Confirmação de feedback salvo
    Server-->>CL: Feedback recebido

    User->>App: Visualizar feedbacks recebidos
    App->>Server: Solicitar feedbacks
    Server->>DB: Consultar feedbacks
    DB-->>Server: Retornar feedbacks
    Server-->>App: Enviar feedbacks para visualização
    App-->>User: Exibir feedbacks

    User->>App: Logout
    App->>Server: Solicitar encerramento da sessão
    Server->>DB: Invalidar token do usuário
    DB-->>Server: Sessão encerrada
    Server-->>App: Confirmação de logout
    App-->>User: Logout realizado