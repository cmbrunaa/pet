require("dotenv").config();

const jwt = require("jsonwebtoken");

const SECRET =
  process.env.JWT_SECRET;

module.exports = (req, res, next) => {

  const authHeader =
    req.headers.authorization;

  if (!authHeader) {

    return res.status(401).json({
      erro: "Token não informado"
    });

  }

  const partes =
    authHeader.split(" ");

  if (partes.length !== 2) {

    return res.status(401).json({
      erro: "Formato do token inválido"
    });

  }

  const [tipo, token] = partes;

  if (tipo !== "Bearer") {

    return res.status(401).json({
      erro: "Formato do token inválido"
    });

  }

  try {

    const decoded =
      jwt.verify(token, SECRET);

    req.usuarioId =
      decoded.id;

    next();

  } catch (err) {

    return res.status(401).json({
      erro: "Token inválido"
    });

  }

};