const dashboardService =
require("./dashboardService");

async function gerarRecomendacao(usuarioId) {

  try {

    const dados =
      await dashboardService
        .obterDashboardSemanal(usuarioId);

    const mediaDiaria =
      dados.mediaDiaria;

    if (!mediaDiaria || mediaDiaria === 0) {

      return {

        recomendacao: 100,

        mensagem:
          "Usando valor padrão (100g)"

      };

    }

    // 🎯 dividir por refeições

    const refeicoesPorDia = 2;

    let quantidade =
      mediaDiaria / refeicoesPorDia;

    // ajuste IA

    quantidade =
      quantidade * 1.05;

    quantidade =
      Math.round(quantidade);

    return {

      recomendacao: quantidade,

      mensagem:
        "Baseado no consumo médio"

    };

  } catch (error) {

    console.error(
      "Erro IA Service:",
      error
    );

    throw error;

  }

}

module.exports = {
  gerarRecomendacao
};