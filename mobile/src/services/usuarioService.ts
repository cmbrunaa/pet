import api from "./api";

export async function cadastrarUsuario(
  nome: string,
  email: string,
  senha: string,
  nomePet: string
) {
  const response = await api.post(
    "/api/usuarios",
    {
      nome,
      email,
      senha,
      nomePet,
    }
  );

  return response.data;
}