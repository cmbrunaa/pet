
# 🐶 Alimentador Automático de Pets com IoT e IA

Sistema inteligente de alimentação automática para pets utilizando **IoT, Inteligência Artificial e aplicativo mobile**.

O projeto integra:

- 📱 Aplicativo Mobile  
- 🧠 Backend com IA  
- 🔌 ESP32 com sensor de peso  
- ⚙️ Automação de alimentação  

---

# 📌 Visão Geral do Projeto

Funcionamento do sistema:

Usuário (Mobile)
        ↓
Backend (Node.js API)
        ↓
ESP32 (IoT)
        ↓
Sensor de Peso
        ↓
Motor libera ração

O sistema permite:

- Alimentação manual  
- Agendamentos automáticos  
- Recomendação inteligente (IA)  

---

# 🚀 Funcionalidades

## 📱 Mobile

- Login de usuário
- Alimentação manual
- Criação de agendamentos
- Visualização de histórico
- Dashboard com status do recipiente
- Recomendação automática (IA)

---

## 🧠 Backend

- API REST em Node.js
- Autenticação JWT
- Controle de comandos
- Sistema de agendamentos
- Armazenamento de histórico
- Recomendação baseada em IA

---

## 🔌 IoT (ESP32)

- Leitura do sensor de peso
- Controle do motor
- Comunicação com backend
- Execução automática de comandos

---

# 🧠 Inteligência Artificial

A IA analisa:

- Consumo histórico
- Média diária
- Sugere quantidade ideal

Exemplo:

Consumo médio: 95g  
Recomendação: 100g  

---

# 🧰 Tecnologias Utilizadas

## Backend

- Node.js  
- Express  
- MySQL  
- JWT  
- bcrypt  
- dotenv  

## Mobile

- React Native  
- Expo  
- TypeScript  
- Axios  
- AsyncStorage  

## IoT

- ESP32  
- HX711  
- Célula de carga  
- Servo Motor  
- Display LCD  

---

# 📁 Estrutura do Projeto

pet-feeder/
│
├── backend/
│       → API e lógica do sistema
│
├── mobile/
│       → Aplicativo mobile
│
├── README.md
│       → Documentação principal

---




## 3️⃣ Rodar Mobile

cd mobile  
npm install  
npx expo start  

---

# 📊 Exemplo de Uso

1. Abrir aplicativo  
2. Verificar status  
3. Criar alimentação ou agendamento  
4. ESP executa comando  
5. Histórico é salvo  

---

# 🎯 Objetivo do Projeto

Projeto desenvolvido para a disciplina:

Fundamentos de IoT e Inteligência Artificial

Objetivo:

Criar um sistema funcional integrando hardware,
software e inteligência artificial.




