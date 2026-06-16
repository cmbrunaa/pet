require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connection = require("./src/config/db");
const initDb = require("./src/config/initDb");

const mqttClient = require("./src/config/mqtt");

const alimentadorRoutes = require("./src/routes/alimentadorRoutes");
const usuarioRoutes = require("./src/routes/usuarioRoutes");
const dashboardRoutes = require("./src/routes/dashboardRoutes");
const iaRoutes = require("./src/routes/iaRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", usuarioRoutes);
app.use("/api", alimentadorRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/ia", iaRoutes);

app.get("/", (req, res) => {
  res.send("API PetFeeder online!");
});

const PORT = process.env.PORT || 3000;

connection.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao MySQL:", err);
    return;
  }

  console.log("✅ Conectado ao MySQL!");

  initDb();

  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});