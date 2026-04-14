require("dotenv").config();

const express = require("express");
const cors = require("cors");

require("./src/config/db");

const alimentadorRoutes =
require("./src/routes/alimentadorRoutes");

const usuarioRoutes =
require("./src/routes/usuarioRoutes");

const dashboardRoutes =
require("./src/routes/dashboardRoutes");

const iaRoutes =
require("./src/routes/iaRoutes");

const app = express();

// ===============================
// MIDDLEWARES
// ===============================

app.use(cors());

app.use(express.json());

// ===============================
// ROTAS
// ===============================

// Usuários

app.use("/api", usuarioRoutes);

// Alimentador

app.use("/api", alimentadorRoutes);

// Dashboard

app.use(
  "/api/dashboard",
  dashboardRoutes
);

// IA

app.use(
  "/api/ia",
  iaRoutes
);

// ===============================
// PORTA
// ===============================

const PORT =
  process.env.PORT || 3000;

app.listen(PORT, () => {

  console.log(
    `Servidor rodando na porta ${PORT}`
  );

});