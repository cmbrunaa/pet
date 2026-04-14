const dashboardService = require("../services/dashboardService");

async function dashboardSemanal(req, res) {
  try {
    const usuarioId = req.usuarioId;

    const dados = await dashboardService.obterDashboardSemanal(usuarioId);

    res.json(dados);
  } catch (error) {
    console.error("Erro dashboard semanal:", error);

    res.status(500).json({
      erro: "Erro ao obter dashboard semanal",
    });
  }
}

async function dashboardMensal(req, res) {
  try {
    const usuarioId = req.usuarioId;

    const dados = await dashboardService.obterDashboardMensal(usuarioId);

    res.json(dados);
  } catch (error) {
    console.error("Erro dashboard mensal:", error);

    res.status(500).json({
      erro: "Erro ao obter dashboard mensal",
    });
  }
}

async function estatisticas(req, res) {

  try {

    const usuarioId =
      req.usuarioId;

    // 📊 Dados estatísticos
    const estatisticas =
      await dashboardService
        .obterEstatisticas(usuarioId);

    // 🤖 Média diária (IA base)
    const dashboardSemanal =
      await dashboardService
        .obterDashboardSemanal(usuarioId);

    res.json({

      ...estatisticas,

      mediaDiaria:
        dashboardSemanal.mediaDiaria

    });

  } catch (error) {

    console.error(
      "Erro estatisticas:",
      error
    );

    res.status(500).json({

      erro:
        "Erro ao obter estatísticas"

    });

  }

}

async function graficoSemanal(req, res) {
  try {
    const usuarioId = req.usuarioId;

    const dados = await dashboardService.obterGraficoSemanal(usuarioId);

    res.json(dados);
  } catch (error) {
    console.error("Erro grafico semanal:", error);

    res.status(500).json({
      erro: "Erro ao obter gráfico semanal",
    });
  }
}
async function graficoMensal(req, res) {
  try {
    const usuarioId = req.usuarioId;

    const dados = await dashboardService.obterGraficoMensal(usuarioId);

    res.json(dados);
  } catch (error) {
    console.error("Erro grafico mensal:", error);

    res.status(500).json({
      erro: "Erro ao obter gráfico mensal",
    });
  }
}
module.exports = {
  dashboardSemanal,
  dashboardMensal,
  estatisticas,
  graficoSemanal,
  graficoMensal,
};
