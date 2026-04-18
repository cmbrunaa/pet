import api from "./api";



export async function criarAgendamento(
  hora: string,
  peso: number
) {

  try {

    const response =
      await api.post(
        "/api/agendar",
        {
          hora,
          peso,
        }
      );

    return response.data;

  } catch (error: any) {

    console.log(
      "Erro criar agendamento:",
      error?.response?.data || error
    );

    throw error;

  }

}



export async function listarAgendamentos() {

  try {

    const response =
      await api.get(
        "/api/agendamentos"
      );


    if (Array.isArray(response.data)) {

      return response.data;

    }

    return (
      response.data.agendamentos || []
    );

  } catch (error) {

    console.log(
      "Erro listar agendamentos:",
      error
    );

    return [];

  }

}


export async function excluirAgendamento(
  id: number
) {

  try {

    await api.delete(
      `/api/agendamento/${id}`
    );

  } catch (error) {

    console.log(
      "Erro excluir agendamento:",
      error
    );

    throw error;

  }

}