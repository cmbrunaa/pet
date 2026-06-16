const connection = require("./src/config/db");

function initDb() {
  const queries = [
    `CREATE TABLE IF NOT EXISTS usuarios (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(100) NOT NULL,
      email VARCHAR(150) NOT NULL UNIQUE,
      senha VARCHAR(255) NOT NULL,
      nome_pet VARCHAR(100) NOT NULL,
      criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,

    `CREATE TABLE IF NOT EXISTS agendamentos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      usuario_id INT NOT NULL,
      hora TIME NOT NULL,
      peso_desejado INT NOT NULL,
      criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
        ON DELETE CASCADE
    )`,

    `CREATE TABLE IF NOT EXISTS historico (
      id INT AUTO_INCREMENT PRIMARY KEY,
      usuario_id INT NOT NULL,
      data DATETIME NOT NULL,
      quantidade INT NOT NULL,
      peso_antes INT DEFAULT 0,
      peso_desejado INT DEFAULT 0,
      criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
        ON DELETE CASCADE
    )`,
  ];

  queries.forEach((sql) => {
    connection.query(sql, (err) => {
      if (err) {
        console.error("Erro ao criar tabela:", err);
        return;
      }

      console.log("✅ Tabela verificada/criada");
    });
  });
}

module.exports = initDb;
