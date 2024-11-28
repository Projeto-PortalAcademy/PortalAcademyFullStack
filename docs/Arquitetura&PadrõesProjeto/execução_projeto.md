## **Como Executar o Projeto**

O projeto pode ser executado de duas maneiras: **utilizando Docker** ou **instalando as dependências localmente**. 



### **1. Executar com Docker**

### **Pré-requisitos**
1. Instale o **Docker** e o **Docker Compose** no sistema.

### **Passos**

1. Clone o repositório:
   ```bash
   git clone https://github.com/Projeto-PortalAcademy/PortalAcademyFullStack.git
   ```

2. **Suba os serviços do Backend e do Frontend**:

   - Navegue até o diretório raiz do backend:
     ```bash
     cd form_generator
     ```

   - Suba todos os serviços com Docker Compose:
     ```bash
     docker-compose up -d
     ```

3. O Docker Compose irá subir:
   - Backend (FastAPI): [http://localhost:8000/docs](http://localhost:8000/docs)
   - Frontend (Next.js): [http://localhost:3000](http://localhost:3000)



### **2. Execução Localmente**

Se preferir executar o projeto localmente, sem o Docker, siga os passos abaixo.

### **Pré-requisitos**
1. Instale o **Python 3.11** no sistema.
2. Instale o **Poetry** para gerenciar dependências do backend.
3. Instale o **Node.js** e o **npm** para gerenciar o frontend.
4. Certifique-se de ter **PostgreSQL** e **MongoDB** executando no sistema.



### **Passos**

#### **Backend**

1. Clone o repositório:
   ```bash
   git clone https://github.com/Projeto-PortalAcademy/PortalAcademyFullStack.git
   ```

2. Navegue para o diretório do backend:
   ```bash
   cd form_generator
   ```

3. Instale as dependências do backend:
   ```bash
   poetry install
   ```

4. Crie um arquivo `.env` no diretório `form_generator` e configure as variáveis de ambiente necessárias (exemplo de configuração mínima):

   ```plaintext
   DATABASE_URL=postgresql+psycopg://postgres:<PASSWORD>@localhost:5432/academy
   MONGODB_URI=mongodb://root:root@localhost:27018
   ```

5. Aplique as migrações no banco de dados PostgreSQL:
   ```bash
   poetry run alembic upgrade head
   ```

6. Inicie o servidor FastAPI:
   ```bash
   poetry run uvicorn services.app:app --host 0.0.0.0 --port 8000
   ```

7. O backend estará disponível em:
   - Swagger UI: [http://localhost:8000/docs](http://localhost:8000/docs)


#### **Frontend**

1. Navegue para o diretório do frontend:
   ```bash
   cd academy-app
   ```

2. Instale as dependências do frontend:
   ```bash
   npm install
   ```

3. Inicie o servidor Next.js:
   ```bash
   npm run dev
   ```

4. O frontend estará disponível em:
   - [http://localhost:3000](http://localhost:3000)

---

## **Resumo de Portas**

| Serviço         | Porta Local        | Descrição                                    |
|------------------|--------------------|--------------------------------------------|
| Backend (FastAPI)| `8000`            | API principal com Swagger UI disponível.   |
| Frontend (Next.js)| `3000`           | Interface web do sistema.                  |
| PostgreSQL       | `5432`            | Banco de dados relacional.                 |
| MongoDB          | `27018`           | Banco de dados não relacional.             |

