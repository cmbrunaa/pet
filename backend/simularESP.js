require("dotenv").config();

const axios = require("axios");

const API_BASE =
  "http://localhost:3000/api";

const API_COMANDO =
  `${API_BASE}/comando`;

const API_PESO =
  `${API_BASE}/peso`;

const TOKEN =
  process.env.ESP_TOKEN;

let pesoAtual = 0;

console.log(
  "ESP8266 simulado iniciado 📡"
);

setInterval(async () => {

  try {

    // 🐶 consumo natural

 pesoAtual -= Math.floor(
  Math.random() * 2
);

    if (pesoAtual < 0) {
      pesoAtual = 0;
    }

    // 🔵 Enviar peso

    await axios.post(

      API_PESO,

      {
        peso: pesoAtual
      },

      {
        headers: {
          Authorization:
            `Bearer ${TOKEN}`
        }
      }

    );

    // 🔵 Consultar comando

    const response =
      await axios.get(

        API_COMANDO,

        {
          headers: {
            Authorization:
              `Bearer ${TOKEN}`
          }
        }

      );

    const comando =
      response.data.comando;

    if (comando) {

      console.log(
        "📦 Comando recebido:"
      );

      console.log(comando);

      console.log(
        `🐶 Liberando ${comando.quantidade}g...`
      );

      pesoAtual +=
        comando.quantidade;

      console.log(
        `⚖️ Novo peso: ${pesoAtual}g`
      );

    } else {

      console.log(
        `⏳ Peso atual: ${pesoAtual}g`
      );

    }

  } catch (erro) {

    console.log(
      "Erro na comunicação:",
      erro.message
    );

  }

}, 6000);