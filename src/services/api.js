'use strict';
var Config = require('../../config.js');
var request = require('request');

const url = Config().API.Base_URL + Config().API.Endpoints.Consume;

module.exports = class ApiService {
  
  report(volume) {
    request
      .post(url + volume)
      .on('response', (response) => {
        console.log("Reporting data (" + response.statusCode + ")");
      })
      .on('error', (err) => {
        console.log(err);
      });
  }
}