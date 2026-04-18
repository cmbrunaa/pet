import api from "./api";

export async function getRecomendacaoIA() {

  try {

    const response =
      await api.get(
        "/api/ia/recomendacao"
      );

    return response.data;

  } catch (error) {

    console.log(
      "Erro IA:",
      error
    );

    return {
      recomendacao: 0,
      mensagem: "Erro ao gerar recomendação"
    };

  }

}