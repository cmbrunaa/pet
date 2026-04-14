const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const usuarioModel = require(
  "../models/usuarioModel"
);

const SECRET = "pet_feeder_secret";


// ===============================
// CADASTRO
// ===============================

exports.cadastrar = async (
  nome,
  email,
  senha,
  nomePet
) => {

  const usuarioExistente =
    await usuarioModel.buscarPorEmail(email);

  if (usuarioExistente) {

    return null;

  }

  const senhaCriptografada =
    await bcrypt.hash(senha, 10);

  const id =
    await usuarioModel.criarUsuario(
      nome,
      email,
      senhaCriptografada,
      nomePet
    );

  return id;

};


// ===============================
// LOGIN
// ===============================

exports.login = async (
  email,
  senha
) => {

  const usuario =
    await usuarioModel.buscarPorEmail(email);

  if (!usuario) {

    return null;

  }

  const senhaValida =
    await bcrypt.compare(
      senha,
      usuario.senha
    );

  if (!senhaValida) {

    return null;

  }

  const token =
    jwt.sign(
      { id: usuario.id },
      SECRET,
      { expiresIn: "30d" }
    );

  return token;

};