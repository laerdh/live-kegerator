'use strict';
var Config = require('../../config.js');

module.exports = class FlowMeter {
  
  constructor(sensor, callback) {
    this.sensor = sensor;
    this.callback = callback;
    this.didChange = false;
    this.lpp = Config().Sensor.LPP;
    this.pulses = 0;
    this.initSensor();
  }
  
  initSensor() {
    this.sensor.on('change', (value) => {
      this.didReceivePulse(value);
    });

    setInterval(() => {
      if (!this.didChange) {
        return;
      }

      var volume = this.convertPulsesToLiters();
      console.log('\n\nPulses: ' + this.pulses + '\nLiters: ' + volume + '\n\n');

      this.callback(volume);
      this.reset();

    }, Config().API.Poll_rate)
  }

  didReceivePulse(value) {
    if (value === 0) {
      return;
    }

    this.pulses++;
    this.didChange = true;
  }

  convertPulsesToLiters() {
    var l = 0;
    l = (this.pulses * this.lpp);
    l /= 1000;

    return l;
  }

  reset() {
    this.pulses = 0;
    this.didChange = false;
  }
}