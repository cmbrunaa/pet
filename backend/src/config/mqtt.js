const alimentadorRepository =
require("../repository/alimentadorRepository");
const mqtt = require('mqtt');

const client = mqtt.connect('mqtt://broker.hivemq.com:1883');

client.on('connect', () => {
    console.log('Conectado ao broker MQTT');

    client.subscribe('pet/dispenser/peso', (err) => {
        if (!err) {
            console.log('Inscrito no tópico pet/dispenser/peso');
        }
    });
});

client.on('message', (topic, message) => {
    console.log(
        `Mensagem recebida em ${topic}: ${message.toString()}`
    );
    alimentadorRepository.atualizarPeso(1, parseFloat(message.toString()));
});

module.exports = client;