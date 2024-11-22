# Documento de Requisitos do Produto

### **Introdução**

Como coordenador de estágio da 2RP Net, sua missão é garantir que o desempenho dos estagiários seja monitorado de forma eficiente e centralizada, facilitando a avaliação de seu progresso. Com o crescimento da equipe de estagiários, é necessário uma solução robusta que permita acompanhar suas presenças, progresso técnico e relatórios de maneira prática e acessível, com um foco exclusivo nos coordenadores da Academy, sem a necessidade de interação dos estagiários diretamente na plataforma.

Hoje, a tarefa de monitoramento envolve o uso de diversas planilhas e documentos dispersos, dificultando uma visão clara e integrada do desempenho dos estagiários. A solução proposta visa resolver esse problema, centralizando todas as informações em um único sistema, que permite o acompanhamento das turmas e de cada estagiário de forma organizada e em tempo real.

A página de gestão de equipe será um pilar central na estratégia de avaliação e controle do progresso dos estagiários, fornecendo as ferramentas necessárias para avaliações detalhadas e relatórios rápidos e fáceis de interpretar. Este Documento de Requisitos de Produto (PRD) descreve as funcionalidades essenciais para o desenvolvimento desse sistema, que ajudará a otimizar a gestão do time de estagiários, assegurando que cada um esteja progredindo conforme o planejado e que eventuais problemas possam ser identificados e corrigidos de forma eficiente.

### **Personas**

1. **Vinicius, o Coordenador**
    - **Objetivo**: Monitorar o progresso dos estagiários, identificar áreas de desenvolvimento e fornecer feedback construtivo com base em relatórios e dashboards.
    - **Frustração**: Ter que navegar por várias planilhas para reunir informações dispersas sobre os estagiários.
    - **Necessidade**: Uma plataforma centralizada para gerenciar informações, presenças e observações, além de uma visão geral rápida de squads e turmas.

### **Público-Alvo**

Este PRD tem como foco:

- **Coordenadores da Academy**: Precisam de uma ferramenta que centralize a gestão de estagiários, incluindo controle de presença, avaliações e relatórios.

### **Requisitos Funcionais**

1. **Tela de Login**  
   - Sistema autenticado para acesso exclusivo dos coordenadores da Academy.  
   - Validação de credenciais para garantir segurança e privacidade dos dados.  

2. **Sistema de Presença com Campo de Observações**  
   - Registro de presença diária dos estagiários.  
   - Possibilidade de adicionar observações relacionadas a ausências, atestados médicos ou comportamentos relevantes.  

3. **Geração de Avaliação Própria**  
   - Ferramenta para criar avaliações técnicas e comportamentais dos estagiários.  
   - Avaliações geradas exclusivamente pela plataforma, eliminando dependências de ferramentas externas, como Google Forms.  

4. **Dashboards - Visão de Turmas, Squads e Estagiários**  
   - Visualização centralizada do progresso dos estagiários.  
   - Métricas claras, como desempenho técnico, presença e feedbacks coletados nas avaliações.  


### **Requisitos Não Funcionais**

1. **Segurança**  
   - O acesso ao sistema deve ser restrito a coordenadores autorizados.  
   - Os dados sensíveis, como avaliações e observações, devem ser protegidos contra acessos não autorizados.  

2. **Usabilidade**  
   - Interface amigável e intuitiva, com elementos visuais claros e navegação simplificada.  
   - Mensagens de erro e validação devem ser claras e informativas.   

3. **Escalabilidade**  
   - Capacidade de suportar o crescimento do número de estagiários e coordenadores sem degradação perceptível do desempenho.  

4. **Manutenibilidade**  
   - O sistema deve ser construído utilizando boas práticas de codificação e arquitetura modular, facilitando correções e atualizações futuras.  
   - A documentação do código deve ser clara e completa, com comentários explicativos.  

5. **Compatibilidade**  
   - Deve funcionar em diferentes sistemas operacionais, como Windows, macOS e Linux, e ser acessível via navegador web.  
   - Deve ser compatível com bancos de dados relacionais (ex.: PostgreSQL ou MySQL) e não relacionais (ex.: MongoDB).  
   - A arquitetura deve permitir o uso combinado de diferentes tipos de bancos de dados, dependendo das necessidades específicas de armazenamento e consulta de dados.  
