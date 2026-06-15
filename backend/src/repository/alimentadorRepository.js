// ===============================
// ESTRUTURAS POR USUÁRIO
// ===============================

let comandosPendentes = {};

let pesosUsuarios = {};

let pesosDesejadosUsuarios = {};

let ultimoStatusUsuarios = {};

const atualizarPeso = (usuarioId, peso) => {
    pesosUsuarios[usuarioId] = peso;

   console.log("⚖️ Peso atualizado:", peso);
};

const obterPeso = (usuarioId) => {

  return pesosUsuarios[usuarioId] || 0;
};

const obterPesoDesejado = (usuarioId) => {

  return pesosDesejadosUsuarios[usuarioId] || 300;
}

const criarComandoPendente = (usuarioId, quantidadeLiberar) => {
  comandosPendentes[usuarioId] = {
    tipo: "ALIMENTAR",

    quantidade: quantidadeLiberar,

    data: new Date(),

    pesoAntes: obterPeso(usuarioId),

    pesoDesejado: obterPesoDesejado(usuarioId),
  };

  return comandosPendentes[usuarioId];
};

const quantidadeLiberar = (usuarioId, quantidadeSolicitada) => {
    const pesoAtual = obterPeso(usuarioId);
    const pesoDesejado = obterPesoDesejado(usuarioId);

    const quantidadeNecessaria = pesoDesejado - pesoAtual;

    return Math.min(
        quantidadeSolicitada,
        quantidadeNecessaria,
    );
};

module.exports = { atualizarPeso, obterPeso, obterPesoDesejado, criarComandoPendente, quantidadeLiberar };
