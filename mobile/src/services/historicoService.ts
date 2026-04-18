import api from "./api";

export async function getHistorico() {

  const response =
    await api.get("/api/historico");

  return response.data.historico;

}