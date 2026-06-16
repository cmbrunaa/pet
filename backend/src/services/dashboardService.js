const db = require("../config/db");

// ===============================
// IA — DETECTAR CONSUMO ANORMAL
// ===============================

function verificarConsumoAnormal(consumoHoje, mediaDiaria) {
  if (!mediaDiaria) {
    return "Normal";
  }

  if (consumoHoje < mediaDiaria * 0.5) {
    return "Baixo";
  }

  if (consumoHoje > mediaDiaria * 1.5) {
    return "Alto";
  }

  return "Normal";
}

// ===============================
// DASHBOARD SEMANAL
// ===============================

function obterDashboardSemanal(usuarioId) {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
          DATE(data) as dia,
          SUM(quantidade) as total
      FROM historico
      WHERE usuario_id = ?
      AND data >= CURDATE() - INTERVAL 6 DAY
      GROUP BY DATE(data)
      ORDER BY dia;
    `;

    db.query(query, [usuarioId], (err, rows) => {
      if (err) {
        return reject(err);
      }

      const ultimos7Dias = [];

      for (let i = 6; i >= 0; i--) {
        const data = new Date();

        data.setDate(data.getDate() - i);

        const diaFormatado = data.toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
        });

        ultimos7Dias.push({
          dia: diaFormatado,
          total: 0,
        });
      }

      rows.forEach((item) => {
        const diaBanco = new Date(item.dia).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
        });

        const index = ultimos7Dias.findIndex((d) => d.dia === diaBanco);

        if (index !== -1) {
          ultimos7Dias[index].total = Number(item.total);
        }
      });

      const totalConsumido = ultimos7Dias.reduce(
        (acc, item) => acc + item.total,
        0,
      );

      const mediaDiaria = Number((totalConsumido / 7).toFixed(2));

      resolve({
        totalConsumido,
        mediaDiaria,
        consumoPorDia: ultimos7Dias,
      });
    });
  });
}

// ===============================
// ESTATÍSTICAS
// ===============================

function obterEstatisticas(usuarioId) {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
        SUM(quantidade) as totalConsumido,
        MAX(quantidade) as maiorConsumo,
        MIN(quantidade) as menorConsumo,
        COUNT(*) as totalRegistros
      FROM historico
      WHERE usuario_id = ?;
    `;

    db.query(query, [usuarioId], (err, rows) => {
      if (err) {
        return reject(err);
      }

      const dados = rows[0];

      const totalConsumido = Number(dados.totalConsumido) || 0;

      const totalRegistros = Number(dados.totalRegistros) || 0;

      const mediaDiaria =
        totalRegistros > 0
          ? Number((totalConsumido / totalRegistros).toFixed(2))
          : 0;

      const consumoHoje = dados.menorConsumo || 0;

      // 🚨 IA AQUI

      const alertaConsumo = verificarConsumoAnormal(consumoHoje, mediaDiaria);

      resolve({
        totalConsumido,

        maiorConsumo: Number(dados.maiorConsumo) || 0,

        menorConsumo: Number(dados.menorConsumo) || 0,

        totalRegistros,

        mediaDiaria,

        alertaConsumo,
      });
    });
  });
}

// ===============================
// GRÁFICO SEMANAL
// ===============================

function obterGraficoSemanal(usuarioId) {
  return new Promise((resolve, reject) => {
    obterDashboardSemanal(usuarioId)
      .then((dados) => {
        const labels = dados.consumoPorDia.map((item) => item.dia);

        const data = dados.consumoPorDia.map((item) => item.total);

        resolve({
          labels,
          data,
        });
      })

      .catch((error) => {
        reject(error);
      });
  });
}

module.exports = {
  obterDashboardSemanal,
  obterEstatisticas,
  obterGraficoSemanal,
};
