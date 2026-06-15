const mqttClient = require("../config/mqtt");

const liberarRacao = (quantidadeNecessaria) => {
  mqttClient.publish(
    "pet/dispenser/comando",
    "liberar;".concat(quantidadeNecessaria),
  );
};

module.exports = { liberarRacao };
