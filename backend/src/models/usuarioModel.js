const db = require("../config/db");


// ===============================
// CRIAR USUÁRIO
// ===============================

exports.criarUsuario = (
  nome,
  email,
  senha,
  nomePet
) => {

  return new Promise((resolve, reject) => {

    const sql = `
      INSERT INTO usuarios
      (nome, email, senha, nome_pet)
      VALUES (?, ?, ?, ?)
    `;

    db.query(
      sql,
      [nome, email, senha, nomePet],
      (err, result) => {

        if (err) reject(err);
        else resolve(result.insertId);

      }
    );

  });

};


// ===============================
// BUSCAR POR EMAIL
// ===============================

exports.buscarPorEmail = (email) => {

  return new Promise((resolve, reject) => {

    const sql = `
      SELECT * FROM usuarios
      WHERE email = ?
    `;

    db.query(
      sql,
      [email],
      (err, results) => {

        if (err) reject(err);
        else resolve(results[0]);

      }
    );

  });

};