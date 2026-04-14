# Alimentador Automático de Pets — Backend

Este é o backend do projeto **Alimentador Automático de Pets com IoT**, desenvolvido em **Node.js + MySQL**, com integração com:

* Aplicativo Mobile 
* ESP32 (ou simulador) 
* Inteligência Artificial 

---

# Tecnologias Utilizadas

* Node.js
* Express
* MySQL
* JWT (Autenticação)
* dotenv (.env)
* Axios (simulador ESP)
* bcrypt (criptografia de senha)

---

# 📁 Estrutura do Projeto

```text
backend/
│
├── src/
│   ├── config/
│   │   └── db.js
│   │       → Conexão com o banco MySQL
│
│   ├── controllers/
│   │       → Recebem requisições HTTP
│   │       → Chamam os services
│   │
│   │   alimentadorController.js
│   │       → Alimentação manual
│   │       → Peso
│   │       → Histórico
│   │       → Agendamentos
│   │
│   │   dashboardController.js
│   │       → Dados do dashboard
│   │       → Estatísticas
│   │       → Gráficos
│   │
│   │   usuarioController.js
│   │       → Cadastro
│   │       → Login
│   │
│   │   iaController.js
│   │       → Recomendação da IA
│
│   ├── middlewares/
│   │   authMiddleware.js
│   │       → Verifica token JWT
│
│   ├── models/
│   │       → Acessam o banco
│   │
│   │   usuarioModel.js
│   │   historicoModel.js
│   │   agendamentoModel.js
│
│   ├── routes/
│   │       → Definem as rotas da API
│   │
│   │   usuarioRoutes.js
│   │   alimentadorRoutes.js
│   │   dashboardRoutes.js
│   │   iaRoutes.js
│
│   ├── services/
│   │       → Contém a lógica do sistema
│   │
│   │   usuarioService.js
│   │   alimentadorService.js
│   │   dashboardService.js
│   │   iaService.js
│
├── simularESP.js
│       → Simula o ESP32
│
├── .env
│       → Variáveis de ambiente
│
├── .gitignore
│       → Arquivos ignorados pelo Git
│
├── server.js
│       → Arquivo principal do servidor
│
├── package.json
│       → Dependências do projeto
```

---

# ⚙️ Como Configurar o Projeto

## 1️⃣ Instalar Node.js

Baixar:

https://nodejs.org/

Verificar:

```bash
node -v
npm -v
```

---

## 2️⃣ Instalar dependências

Entrar na pasta backend:

```bash
cd backend
```

Instalar:

```bash
npm install
```

---

# Configurar Banco de Dados

Criar banco no MySQL:

```sql
CREATE DATABASE pet_feeder;
```

Depois criar tabelas (se ainda não existirem).

---

# Configurar arquivo `.env`

Criar arquivo:

```bash
.env
```

Conteúdo:

```env
PORT=3000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=pet_feeder

JWT_SECRET=pet_feeder_secret

ESP_TOKEN=COLE_AQUI_O_TOKEN
```

---

# Como pegar o token (para usar no Postman ou no ESP)

O token é necessário para acessar as rotas protegidas da API.

## Passo 1 — Fazer login

No Postman, criar uma requisição:

POST http://localhost:3000/api/login

Body (JSON):

{
  "email": "teste@email.com",
  "senha": "123456"
}

## Passo 2 — Copiar o token

A resposta será assim:

{
  "token": "eyJhbGciOiJIUzI1NiIs..."
}

Copie o valor do **token**.

## Passo 3 — Usar o token

Nas próximas requisições, adicionar no Header:

Authorization: Bearer SEU_TOKEN

Exemplo:

Authorization: Bearer eyJhbGciOiJIUzI1NiIs...

## Passo 4 — Usar no simulador ESP

Abra o arquivo `.env` e cole o token:

ESP_TOKEN=SEU_TOKEN_AQUI

---

# Como Rodar o Backend

No terminal:

```bash
node server.js
```

Resultado esperado:

```text
Servidor rodando na porta 3000
✅ Conectado ao MySQL!
```

---

# Como Rodar o Simulador ESP

Em outro terminal:

```bash
node simularESP.js
```

Resultado esperado:

```text
ESP8266 simulado iniciado 📡
⏳ Peso atual: 0g
```

---

# Como funciona a IA

A IA analisa:

```text
Consumo dos últimos 7 dias
```

Calcula:

```text
Média diária
+
Ajuste de segurança (+5%)
```

Gera:

```text
Recomendação automática de ração
```

---

# Como testar rapidamente

1️⃣ Rodar backend:

```bash
node server.js
```

2️⃣ Rodar simulador:

```bash
node simularESP.js
```

3️⃣ Enviar alimentação:

```http
POST /api/alimentar
```

4️⃣ Ver histórico:

```http
GET /api/historico
```

---
