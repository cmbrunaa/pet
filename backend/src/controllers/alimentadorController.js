const alimentadorService = require("../services/alimentadorService");

const historicoModel = require("../models/historicoModel");

// ===============================
// STATUS
// ===============================

exports.status = (req, res) => {
  const usuarioId = req.usuarioId;

  const status = alimentadorService.obterStatus(usuarioId);

  res.json(status);
};

// ===============================
// ALIMENTAR MANUAL
// ===============================

exports.alimentar = async (req, res) => {
  try {
    const usuarioId = req.usuarioId;

    const { quantidade, modo } = req.body;

    let quantidadeLiberar = 0;

    // ============================
    // MODO DIRETO (IA ou manual)
    // ============================

    if (modo === "direto") {
      if (!quantidade || quantidade <= 0) {
        return res.status(400).json({
          erro: "Quantidade inválida",
        });
      }

      // 🧠 pega peso atual

      const pesoAtual = alimentadorService.obterPeso(usuarioId);

      const capacidadeMaxima = 300;

      const espacoDisponivel = capacidadeMaxima - pesoAtual;

      // 🎯 limita quantidade

      quantidadeLiberar = Math.min(quantidade, espacoDisponivel);

      if (quantidadeLiberar <= 0) {
        return res.json({
          mensagem: "Recipiente cheio",

          quantidadeLiberar: 0,
        });
      }
    }

    // ============================
    // MODO AUTOMÁTICO (sensor)
    // ============================
    else {
      return res.status(400).json({
        erro: "Modo inválido",
      });
    }

    const comando = alimentadorService.criarComando(
      usuarioId,
      quantidadeLiberar,
    );

    await historicoModel.salvar(
      usuarioId,
      new Date().toLocaleDateString("pt-BR"),
      quantidadeLiberar,
      pesoAtual,
      alimentadorService.obterPesoDesejado(usuarioId),
    );

    res.json({
      mensagem: "Comando criado",

      quantidadeLiberar,

      comando,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      erro: "Erro ao alimentar",
    });
  }
};

// ===============================
// ESP CONSULTA COMANDO
// ===============================

exports.obterComando = async (
  req,

  res,
) => {
  const usuarioId = req.usuarioId;

  const comando = await alimentadorService.obterComando(usuarioId);

  res.json({
    comando: comando,
  });
};

// ===============================
// HISTÓRICO
// ===============================

exports.historico = async (
  req,

  res,
) => {
  const usuarioId = req.usuarioId;

  const lista = await historicoModel.listarPorUsuario(usuarioId);

  res.json({
    historico: lista,
  });
};

// ===============================
// PESO ATUAL
// ===============================

exports.atualizarPeso = (
  req,

  res,
) => {
  const usuarioId = req.usuarioId;

  const { peso } = req.body;

  if (peso === undefined) {
    return res.status(400).json({
      erro: "Peso é obrigatório",
    });
  }

  if (peso < 0) {
    return res.status(400).json({
      erro: "Peso não pode ser negativo",
    });
  }

  if (peso > 5000) {
    return res.status(400).json({
      erro: "Peso muito alto",
    });
  }

  const novoPeso = alimentadorService.atualizarPeso(
    usuarioId,

    peso,
  );

  res.json({
    peso: novoPeso,
  });
};

exports.obterPeso = (
  req,

  res,
) => {
  const usuarioId = req.usuarioId;

  const peso = alimentadorService.obterPeso(usuarioId);

  res.json({
    peso,
  });
};

// ===============================
// PESO DESEJADO
// ===============================

exports.definirPesoDesejado = (
  req,

  res,
) => {
  const usuarioId = req.usuarioId;

  const { peso } = req.body;

  const novoPeso = alimentadorService.definirPesoDesejado(
    usuarioId,

    peso,
  );

  res.json({
    pesoDesejado: novoPeso,
  });
};

exports.obterPesoDesejado = (
  req,

  res,
) => {
  const usuarioId = req.usuarioId;

  const peso = alimentadorService.obterPesoDesejado(usuarioId);

  res.json({
    pesoDesejado: peso,
  });
};

// ===============================
// AGENDAR
// ===============================

exports.agendar = async (
  req,

  res,
) => {
  const { hora, peso } = req.body;

  const usuarioId = req.usuarioId;

  const agendamento = await alimentadorService.criarAgendamento(
    hora,

    peso,

    usuarioId,
  );

  if (!agendamento) {
    return res.status(400).json({
      erro: "Horário já existe",
    });
  }

  res.json({
    mensagem: "Agendamento criado",

    agendamento,
  });
};

// ===============================
// LISTAR AGENDAMENTOS
// ===============================

exports.listarAgendamentos = async (req, res) => {
  const usuarioId = req.usuarioId;

  const lista = await alimentadorService.listarAgendamentos(usuarioId);

  res.json({
    agendamentos: lista,
  });
};

// ===============================
// REMOVER AGENDAMENTO
// ===============================

exports.removerAgendamento = async (req, res) => {
  const { id } = req.params;

  const usuarioId = req.usuarioId;

  const removido = await alimentadorService.removerAgendamento(
    id,

    usuarioId,
  );

  if (!removido) {
    return res.status(404).json({
      erro: "Agendamento não encontrado",
    });
  }

  res.json({
    mensagem: "Agendamento removido",
  });
};

// ===============================
// EDITAR AGENDAMENTO
// ===============================

exports.editarAgendamento = async (req, res) => {
  const { id } = req.params;

  const { hora, peso } = req.body;

  const usuarioId = req.usuarioId;

  const resultado = await alimentadorService.editarAgendamento(
    id,

    hora,

    peso,

    usuarioId,
  );

  if (resultado === "duplicado") {
    return res.status(400).json({
      erro: "Horário já existe",
    });
  }

  if (!resultado) {
    return res.status(404).json({
      erro: "Agendamento não encontrado",
    });
  }

  res.json({
    mensagem: "Agendamento atualizado",

    agendamento: resultado,
  });
};
