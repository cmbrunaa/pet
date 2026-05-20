
# 📱 Alimentador Automático de Pets — Mobile

Este é o aplicativo mobile do projeto **Alimentador Automático de Pets com IoT**, desenvolvido em **React Native com Expo**, responsável por permitir ao usuário controlar o alimentador remotamente.

O aplicativo se integra com:

- Backend Node.js  
- ESP32 (ou simulador ESP)  
- Sistema de Inteligência Artificial  

---

# 📱 Tecnologias Utilizadas

- React Native  
- Expo  
- TypeScript  
- Axios  
- AsyncStorage  
- Expo Router  
- React Hooks  

---

# 📁 Estrutura do Projeto

```
mobile/
│
├── app/
│
│   ├── (tabs)/
│   │
│   │   dashboard.tsx
│   │       → Tela principal com peso atual,
│   │         status do recipiente e recomendação da IA.
│   │
│   │   alimentar.tsx
│   │       → Permite liberar ração manualmente.
│   │
│   │   historicos.tsx
│   │       → Mostra o histórico das alimentações.
│   │
│   │   agendamentos.tsx
│   │       → Permite criar e gerenciar horários automáticos.
│   │
│   │   perfil.tsx
│   │       → Exibe dados do usuário e logout.
│   │
│   ├── index.tsx
│   │       → Verifica login e redireciona o usuário.
│   │
│   ├── _layout.tsx
│   │       → Define a navegação e rotas do aplicativo.
│
│
├── src/
│
│   ├── services/
│   │
│   │   api.ts
│   │       → Configuração do Axios e autenticação.
│   │
│   │   alimentadorService.ts
│   │       → Envia comandos de alimentação manual.
│   │
│   │   dashboardService.ts
│   │       → Busca dados do dashboard.
│   │
│   │   historicoService.ts
│   │       → Busca histórico de alimentações.
│   │
│   │   agendamentoService.ts
│   │       → Cria e gerencia agendamentos.
│   │
│   │   iaService.ts
│   │       → Obtém recomendação da IA.
│   │
│   │   storage.ts
│   │       → Armazena o token JWT no celular.
│
│   ├── context/
│   │
│   │   AuthContext.tsx
│   │       → Gerencia login, logout e autenticação.
│
│
├── assets/
│       → Ícones e imagens do aplicativo.
│
├── package.json
│       → Dependências e scripts do projeto.
│
├── app.json
│       → Configurações gerais do aplicativo Expo.

```

---

# ⚙️ Como Configurar o Projeto

## 1️⃣ Instalar Node.js

https://nodejs.org/

Verificar:

```bash
node -v
npm -v
```

---

## 2️⃣ Instalar Expo

```bash
npm install -g expo
```

---

## 3️⃣ Instalar dependências

```bash
cd mobile
npm install
```

---

# Configurar URL da API

Editar:

```
src/services/api.ts
```

Definir:

```ts
baseURL: "http://SEU_IP:3000"
```

Exemplo:

```ts
baseURL: "http://192.168.0.105:3000"
```

⚠️ Importante:

- Não usar npm audit no celular  
- Usar o IP da máquina que roda o backend  

AO CONECTAR A REDES PUBLICAS OU MOBILE RODAR NO MOBILE -> npx expo start --tunnel

---

# 🚀 Como Rodar o Aplicativo

```bash
npx expo start
```

Depois:

```
a → Android
w → Web
```

Ou usar:

```
Expo Go
```

---

# 📱 Funcionalidades

## 🐶 Alimentação Manual

Endpoint:

```
POST /api/alimentar
```

---

## 📊 Dashboard

Mostra:

- Peso atual  
- Status do recipiente  
- Total consumido  
- Recomendação IA  

---

## 🤖 Recomendação IA

Baseado em:

- Histórico de consumo  

Exemplo:

```
Recomendação: 98g
```

---

## 📅 Agendamentos

Permite:

- Criar horário automático  
- Listar horários  
- Excluir horários  

---

## 📜 Histórico

Mostra:

- Quantidade  
- Data  
- Tipo (Manual / Agendamento / IA)

---

# 🔐 Autenticação

Usa:

```
JWT
```

Token salvo com:

```
AsyncStorage
```

---

# 🔄 Fluxo do Sistema

```
Mobile
   ↓
Backend
   ↓
ESP32
   ↓
Sensor de peso
```

---

# 🧪 Como Testar

1️⃣ Rodar backend:

```bash
node server.js
```

2️⃣ Rodar simulador:

```bash
node simularESP.js
```

3️⃣ Rodar mobile:

```bash
npx expo start
```

---


