const db = require("../config/db");


// ===============================
// INSERIR HISTÓRICO
// ===============================

exports.salvar = (
  usuarioId,
  data,
  quantidade,
  pesoAntes,
  pesoDesejado
) => {

  return new Promise((resolve, reject) => {

    const sql = `
      INSERT INTO historico
      (
        usuario_id,
        data,
        quantidade,
        peso_antes,
        peso_desejado
      )
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [
        usuarioId,
        data,
        quantidade,
        pesoAntes,
        pesoDesejado
      ],
      (err, result) => {

        if (err) reject(err);
        else resolve(result.insertId);

      }
    );

  });

};


// ===============================
// LISTAR HISTÓRICO DO USUÁRIO
// ===============================

exports.listarPorUsuario = (
  usuarioId
) => {

  return new Promise((resolve, reject) => {

    const sql = `
      SELECT *
      FROM historico
      WHERE usuario_id = ?
      ORDER BY data DESC
    `;

    db.query(
      sql,
      [usuarioId],
      (err, results) => {

        if (err) reject(err);
        else resolve(results);

      }
    );

  });

};