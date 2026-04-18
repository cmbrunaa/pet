import api from "./api";

export async function getPesoAtual() {

  try {

    const response =
      await api.get("/api/peso");

    return response.data?.peso ?? 0;

  } catch (error) {

    console.log(
      "Erro ao buscar peso:",
      error
    );

    return 0;

  }

}