const express = require("express");
const router = express.Router();

const alimentadorController = require(
  "../controllers/alimentadorController"
);

const authMiddleware = require(
  "../middlewares/authMiddleware"
);


// ===============================
// STATUS
// ===============================

router.get(
  "/status",
  authMiddleware,
  alimentadorController.status
);


// ===============================
// ALIMENTAR MANUAL
// ===============================

router.post(
  "/alimentar",
  authMiddleware,
  alimentadorController.alimentar
);


// ===============================
// ESP CONSULTA COMANDO
// ===============================

router.get(
  "/comando",
  authMiddleware,
  alimentadorController.obterComando
);


// ===============================
// HISTÓRICO
// ===============================

router.get(
  "/historico",
  authMiddleware,
  alimentadorController.historico
);


// ===============================
// PESO ATUAL
// ===============================

router.post(
  "/peso",
  authMiddleware,
  alimentadorController.atualizarPeso
);

router.get(
  "/peso",
  authMiddleware,
  alimentadorController.obterPeso
);


// ===============================
// PESO DESEJADO
// ===============================

router.post(
  "/pesoDesejado",
  authMiddleware,
  alimentadorController.definirPesoDesejado
);

router.get(
  "/pesoDesejado",
  authMiddleware,
  alimentadorController.obterPesoDesejado
);


// ===============================
// AGENDAMENTOS
// ===============================

router.post(
  "/agendar",
  authMiddleware,
  alimentadorController.agendar
);

router.get(
  "/agendamentos",
  authMiddleware,
  alimentadorController.listarAgendamentos
);

router.delete(
  "/agendamento/:id",
  authMiddleware,
  alimentadorController.removerAgendamento
);

router.put(
  "/agendamento/:id",
  authMiddleware,
  alimentadorController.editarAgendamento
);


module.exports = router;