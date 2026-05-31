import api from "./api";

export type RecomendacaoIA = {
  recomendacao: number;
  mediaDiaria: number;
  totalConsumido: number;
  padrao: string;
  confianca: string;
  mensagem: string;
};

export async function getRecomendacaoIA(): Promise<RecomendacaoIA> {

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
      mediaDiaria: 0,
      totalConsumido: 0,
      padrao: "Indisponível",
      confianca: "Baixa",
      mensagem: "Erro ao gerar recomendação"
    };

  }

}