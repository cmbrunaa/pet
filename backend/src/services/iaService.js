const dashboardService =
  require("./dashboardService");

async function gerarRecomendacao(usuarioId) {

  try {

    const dados =
      await dashboardService
        .obterDashboardSemanal(usuarioId);

    const mediaDiaria =
      Number(dados.mediaDiaria || 0);

    const totalConsumido =
      Number(dados.totalConsumido || 0);

    if (!mediaDiaria || mediaDiaria === 0) {

      return {
        recomendacao: 100,
        mediaDiaria: 0,
        totalConsumido,
        padrao: "Sem dados suficientes",
        confianca: "Baixa",
        mensagem:
          "Ainda não há histórico suficiente. Foi usado um valor padrão para alimentação."
      };

    }

    const refeicoesPorDia = 2;

    let quantidade =
      mediaDiaria / refeicoesPorDia;

    quantidade =
      quantidade * 1.05;

    quantidade =
      Math.round(quantidade);

    let padrao =
      "Consumo estável";

    let confianca =
      "Alta";

    if (mediaDiaria < 50) {

      padrao =
        "Consumo baixo";

      confianca =
        "Média";

    }

    if (mediaDiaria > 200) {

      padrao =
        "Consumo elevado";

      confianca =
        "Média";

    }

    return {
      recomendacao: quantidade,
      mediaDiaria,
      totalConsumido,
      padrao,
      confianca,
      mensagem:
        "Recomendação gerada com base no histórico de consumo registrado pelo sistema."
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