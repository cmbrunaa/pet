import api from "./api";

export async function getEstatisticas() {

  try {

    const response =
      await api.get(
        "/api/dashboard/estatisticas"
      );

    return response.data;

  } catch (error) {

    console.log(
      "Erro ao buscar estatísticas:",
      error
    );

    throw error;

  }

}

export async function getGraficoSemanal() {

  try {

    const response =
      await api.get(
        "/api/dashboard/grafico-semanal"
      );

    return response.data ?? {
      labels: [],
      data: [],
    };

  } catch (error) {

    return {
      labels: [],
      data: [],
    };

  }

}

export async function getGraficoMensal() {

  try {

    const response =
      await api.get(
        "/api/dashboard/grafico-mensal"
      );

    return response.data ?? {
      labels: [],
      data: [],
    };

  } catch (error) {

    return {
      labels: [],
      data: [],
    };

  }

}

export async function getPesoAtual() {

  try {

    const response =
      await api.get("/api/peso");

    return response.data?.peso ?? 0;

  } catch (error) {

    return 0;

  }

}