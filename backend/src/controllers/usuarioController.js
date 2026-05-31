const usuarioService = require(
  "../services/usuarioService"
);


// ===============================
// CADASTRAR
// ===============================

exports.cadastrar = async (req, res) => {

  const {
    nome,
    email,
    senha,
    nomePet
  } = req.body;

  const id =
    await usuarioService.cadastrar(
      nome,
      email,
      senha,
      nomePet
    );

  if (!id) {

    return res.status(400).json({
      erro: "Email já cadastrado"
    });

  }

  res.json({
    mensagem: "Usuário criado",
    id
  });

};


// ===============================
// LOGIN
// ===============================

exports.login = async (req, res) => {

  const { email, senha } = req.body;

  const resultado =
    await usuarioService.login(
      email,
      senha
    );

  if (!resultado) {

    return res.status(401).json({
      erro: "Email ou senha inválidos"
    });

  }

  res.json({
    token: resultado.token,
    usuario: resultado.usuario
  });

};