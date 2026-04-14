const iaService =
require("../services/iaService");

const alimentadorService =
require("../services/alimentadorService");

async function obterRecomendacao(
  req,
  res
) {

  try {

    const usuarioId =
      req.usuarioId;

    const resultado =
      await iaService
        .gerarRecomendacao(usuarioId);

    res.json(resultado);

  } catch (error) {

    console.error(
      "Erro IA Controller:",
      error
    );

    res.status(500).json({

      erro:
        "Erro ao gerar recomendação"

    });

  }

}


// 🤖 Atualizar meta automática

async function atualizarMetaIA(
  req,
  res
){

  try{

    const usuarioId =
      req.usuarioId;

    const novaMeta =
      await alimentadorService
        .atualizarMetaIA(usuarioId);

    res.json({

      novaMeta

    });

  }catch(error){

    console.error(error);

    res.status(500).json({

      erro:
        "Erro ao atualizar meta IA"

    });

  }

}

module.exports = {

  obterRecomendacao,

  atualizarMetaIA

};