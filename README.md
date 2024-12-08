# Sistema de Gestão de Desempenho de Estagiários da 2RP Net

## Sobre o Projeto

Este projeto tem como objetivo centralizar e otimizar a gestão do desempenho dos estagiários da 2RP Net, facilitando o acompanhamento de presença, avaliações técnicas, relatórios e observações.  

A plataforma foi desenvolvida para uso exclusivo dos coordenadores da Academy, promovendo eficiência, acessibilidade e conformidade com as normas de segurança e privacidade.

---

## Estrutura do Projeto

O sistema é composto por dois componentes principais:

1. **Front-end**: Responsável pela interface visual e experiência do usuário.  
2. **Back-end**: Gerencia os dados e as operações de negócio da aplicação.

Os serviços são executados em containers Docker para simplificar a instalação e garantir consistência no ambiente.

---

## Passo a Passo: Execução do Setup

Para configurar e iniciar o sistema, siga as instruções abaixo:

1. **Certifique-se de ter o Docker e o Docker Compose instalados no sistema.**
   - [Instalar Docker](https://docs.docker.com/get-docker/)

2. **Baixe o projeto ou clone o repositório:**
   ```bash
   git clone [<url-do-repositorio>](https://github.com/Projeto-PortalAcademy/PortalAcademyFullStack.git)
   cd ./PortalAcademyFullStack
   ```

3. **Execute o arquivo `setup.bat` para iniciar os serviços:**
   - No terminal, navegue até a pasta raiz do projeto e execute:
     ```cmd
     setup.bat
     ```

4. **O script realiza as seguintes etapas:**
   - Verifica se a rede Docker `app-network` existe. Se não, cria a rede.
   - Inicia os serviços do front-end e back-end usando `docker-compose`.
   - Exibe os containers em execução ao final do processo.

5. **Acesso ao Sistema:**
   - Após os containers estarem em execução, o sistema estará disponível no navegador, acessando o endereço padrão: [http://localhost:3000](http://localhost:3000).
   - O login na aplicação é feito exclusivamente através do **Google OAuth**, garantindo segurança e facilidade de uso. Certifique-se de usar uma conta autorizada.

---

## Utilizando o Docker

### Principais Comandos Docker

1. **Verificar os containers em execução:**
   ```bash
   docker ps
   ```

2. **Parar os containers:**
   ```bash
   docker-compose -f docker-compose.frontend.yml down
   docker-compose -f docker-compose.backend.yml down
   ```

3. **Reiniciar os serviços:**
   - Para reiniciar o sistema, basta executar novamente o `setup.bat`.

---

## Equipe Responsável

**Gestor do Projeto:** Vinicius Antunes Silva  
**Responsável pelo Projeto:** Vinicius Antunes Silva – Coordenador Academy 2RP Net
