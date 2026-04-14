const db = require("../config/db");


// ===============================
// CRIAR AGENDAMENTO
// ===============================

exports.criar = (
  hora,
  peso,
  usuarioId
) => {

  return new Promise((resolve, reject) => {

    const sql = `
      INSERT INTO agendamentos
      (hora, peso_desejado, usuario_id)
      VALUES (?, ?, ?)
    `;

    db.query(
      sql,
      [hora, peso, usuarioId],
      (err, result) => {

        if (err) reject(err);
        else resolve(result.insertId);

      }
    );

  });

};


// ===============================
// LISTAR POR USUÁRIO
// ===============================

exports.listarPorUsuario = (
  usuarioId
) => {

  return new Promise((resolve, reject) => {

    const sql = `
      SELECT *
      FROM agendamentos
      WHERE usuario_id = ?
      ORDER BY hora
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


// ===============================
// REMOVER
// ===============================

exports.remover = (
  id,
  usuarioId
) => {

  return new Promise((resolve, reject) => {

    const sql = `
      DELETE FROM agendamentos
      WHERE id = ?
      AND usuario_id = ?
    `;

    db.query(
      sql,
      [id, usuarioId],
      (err, result) => {

        if (err) reject(err);
        else resolve(result.affectedRows);

      }
    );

  });

};


// ===============================
// EDITAR
// ===============================

exports.editar = (
  id,
  hora,
  peso,
  usuarioId
) => {

  return new Promise((resolve, reject) => {

    const sql = `
      UPDATE agendamentos
      SET hora = ?, peso_desejado = ?
      WHERE id = ?
      AND usuario_id = ?
    `;

    db.query(
      sql,
      [hora, peso, id, usuarioId],
      (err, result) => {

        if (err) reject(err);
        else resolve(result.affectedRows);

      }
    );

  });

};