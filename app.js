var FlowMeter = require('./src/sensors/flowmeter.js');
var ApiService = require('./src/services/api.js');
var Config = require('./config.js');

const raspi = require('raspi-io');
const five = require('johnny-five');
const request = require('request');
const board = new five.Board({
  io: new raspi()
});

var totalVolume= 0;

board.on('ready', () => {
  const apiService = new ApiService();
  const fSensor = new five.Sensor.Digital(Config().Sensor.PIN);
  const fMeter= new FlowMeter(fSensor, (volume) => {
    totalVolume += volume;
    console.log("TOTAL VOLUME: " + totalVolume);

    apiService.report(volume);
  })
});