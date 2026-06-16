const agendamentoModel = require("../models/agendamentoModel");

const historicoModel = require("../models/historicoModel");

const mqttClient = require("../config/mqtt");

const db = require("../config/db");
const {
  atualizarPeso,
  obterPeso,
  obterPesoDesejado,
  criarComandoPendente,
  quantidadeLiberar,
} = require("../repository/alimentadorRepository");
const { liberarRacao } = require("./mqttService");

// ===============================
// COMANDO MANUAL
// ===============================

exports.criarComando = (usuarioId, quantidadeSolicitada) => {
  const pesoAtual = obterPeso(usuarioId);

  const pesoDesejado = obterPesoDesejado(usuarioId);

  // 🎯 calcula quanto falta

  const quantidadeNecessaria = pesoDesejado - pesoAtual;

  if (quantidadeNecessaria <= 0) {
    return null;
  }

  // 🎯 limita ao necessário

  const qtdLiberar = quantidadeLiberar(usuarioId, quantidadeSolicitada);

  liberarRacao(qtdLiberar);

  const comandos = criarComandoPendente(usuarioId, qtdLiberar);

  return comandos;
};

// ===============================
// CRIAR AGENDAMENTO
// ===============================

exports.criarAgendamento = async (
  hora,

  peso,

  usuarioId,
) => {
  const lista = await agendamentoModel.listarPorUsuario(usuarioId);

  const duplicado = lista.find((ag) => ag.hora.substring(0, 5) === hora);

  if (duplicado) {
    return null;
  }

  const id = await agendamentoModel.criar(
    hora,

    peso,

    usuarioId,
  );

  return {
    id,

    hora,

    pesoDesejado: peso,
  };
};

// ===============================
// LISTAR AGENDAMENTOS
// ===============================

exports.listarAgendamentos = async (usuarioId) => {
  return await agendamentoModel.listarPorUsuario(usuarioId);
};

// ===============================
// REMOVER AGENDAMENTO
// ===============================

exports.removerAgendamento = async (
  id,

  usuarioId,
) => {
  const linhas = await agendamentoModel.remover(
    id,

    usuarioId,
  );

  return linhas > 0;
};

// ===============================
// EDITAR AGENDAMENTO
// ===============================

exports.editarAgendamento = async (
  id,

  hora,

  peso,

  usuarioId,
) => {
  const lista = await agendamentoModel.listarPorUsuario(usuarioId);

  const duplicado = lista.find(
    (ag) => ag.hora.substring(0, 5) === hora && ag.id != id,
  );

  if (duplicado) {
    return "duplicado";
  }

  const linhas = await agendamentoModel.editar(
    id,

    hora,

    peso,

    usuarioId,
  );

  if (linhas === 0) {
    return null;
  }

  return {
    id,

    hora,

    pesoDesejado: peso,
  };
};

// ===============================
// ESP CONSULTA COMANDO
// ===============================

exports.obterComando = async (usuarioId) => {
  const comando = comandosPendentes[usuarioId];

  if (comando) {
    delete comandosPendentes[usuarioId];

    const dataAgora = new Date();

    ultimoStatusUsuarios[usuarioId] = {
      ultimaAlimentacao: dataAgora,
    };

    // salvar histórico

    await historicoModel.salvar(
      usuarioId,

      dataAgora,

      comando.quantidade,

      comando.pesoAntes,

      comando.pesoDesejado,
    );

    return comando;
  }

  return null;
};

// ===============================
// STATUS
// ===============================

exports.obterStatus = (usuarioId) => {
  return (
    ultimoStatusUsuarios[usuarioId] || {
      ultimaAlimentacao: null,
    }
  );
};

// ===============================
// PESO ATUAL
// ===============================

exports.atualizarPeso = (usuarioId, peso) => {
  atualizarPeso(usuarioId, peso);
};

exports.atualizarMetaIA = async (usuarioId) => {
  const dashboardService = require("./dashboardService");

  const dados = await dashboardService.obterDashboardSemanal(usuarioId);

  const media = dados.mediaDiaria;

  if (!media || media === 0) {
    return null;
  }

  const novaMeta = Math.round(media * 1.1);

  pesosDesejadosUsuarios[usuarioId] = novaMeta;

  console.log("🤖 Nova meta IA:", novaMeta);

  return novaMeta;
};

// ===============================
// OBTER PESO
// ===============================

exports.obterPeso = (usuarioId) => {
  return obterPeso(usuarioId);
};

// ===============================
// PESO DESEJADO
// ===============================

exports.definirPesoDesejado = (
  usuarioId,

  peso,
) => {
  pesosDesejadosUsuarios[usuarioId] = peso;

  return peso;
};

exports.obterPesoDesejado = (usuarioId) => {
  return pesosDesejadosUsuarios[usuarioId] || 300;
};

// ===============================
// CONTROLE EXECUÇÃO AGENDAMENTO
// ===============================

let ultimoExecutado = {};

setInterval(() => {
  try {
    const agora = new Date();

    const horaAtual = agora.getHours().toString().padStart(2, "0");

    const minutoAtual = agora.getMinutes().toString().padStart(2, "0");

    const horarioAtual = `${horaAtual}:${minutoAtual}`;

    console.log("🕒 Atual:", horarioAtual);

    const sql = `SELECT * FROM agendamentos`;

    db.query(sql, async (err, lista) => {
      if (err) {
        console.log("Erro agendamento:", err);

        return;
      }

      for (const ag of lista) {
        const horaBanco = ag.hora.toString().substring(0, 5);

        const id = ag.id;

        const usuarioId = ag.usuario_id;

        console.log("🕒 Banco:", horaBanco);

        // 🎯 EXECUTA SOMENTE NO MINUTO EXATO

        if (
          horarioAtual === horaBanco &&
          ultimoExecutado[id] !== horarioAtual
        ) {
          const pesoDesejado = ag.peso_desejado;

          const qtdNecessaria = quantidadeLiberar(usuarioId, pesoDesejado);
          const pesoAtual = obterPeso(usuarioId);

          if (qtdNecessaria > 0 && pesoAtual < pesoDesejado) {
            // comandosPendentes[
            //   usuarioId
            // ] = {

            //   tipo:"AGENDAMENTO",

            //   quantidade,

            //   data:new Date(),

            //   pesoAntes:
            //     pesoAtual,

            //   pesoDesejado

            // };

            console.log(`⏰ EXECUTADO: ${horaBanco}`);
            liberarRacao(qtdNecessaria);
            await historicoModel.salvar(
              usuarioId,
              new Date().toLocaleDateString("pt-BR"),
              qtdNecessaria,
              pesoAtual,
              pesoDesejado,
            );

            ultimoExecutado[id] = horarioAtual;
          }
        }
      }
    });
  } catch (error) {
    console.log("Erro agendamento:", error);
  }
}, 5000);
