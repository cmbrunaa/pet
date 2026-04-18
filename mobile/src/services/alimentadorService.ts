import api from "./api";

export async function liberarRacao(
  quantidade: number
) {

  try {

    console.log(
      "ENVIANDO MANUAL:",
      quantidade
    );

    const response =
      await api.post(
        "/api/alimentar",
        {
          quantidade,
          modo: "direto"
        }
      );

    console.log(
      "RESPOSTA:",
      response.data
    );

    return response.data;

  } catch (error: any) {

    console.log(
      "ERRO AO ALIMENTAR:",
      error?.response?.data || error
    );

    throw error;

  }

}