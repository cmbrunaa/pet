const express =
require("express");

const router =
express.Router();

const iaController =
require("../controllers/iaController");

const authMiddleware =
require("../middlewares/authMiddleware");


// 🤖 GET recomendação

router.get(
  "/recomendacao",
  authMiddleware,
  iaController.obterRecomendacao
);


// 🤖 POST atualizar meta

router.post(
  "/atualizar-meta",
  authMiddleware,
  iaController.atualizarMetaIA
);

module.exports = router;