const express = require("express");

const router = express.Router();

const dashboardController =
    require("../controllers/dashboardController");

const authMiddleware =
    require("../middlewares/authMiddleware");

// Dashboard semanal
router.get(
    "/semana",
    authMiddleware,
    dashboardController.dashboardSemanal
);

router.get(
    "/mes",
    authMiddleware,
    dashboardController.dashboardMensal
);
router.get(
    "/estatisticas",
    authMiddleware,
    dashboardController.estatisticas
);
router.get(
  "/grafico-semanal",
  authMiddleware,
  dashboardController.graficoSemanal
);
router.get(
  "/grafico-mensal",
  authMiddleware,
  dashboardController.graficoMensal
);
module.exports = router;