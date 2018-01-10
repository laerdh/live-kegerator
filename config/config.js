'use strict';

module.exports = function Config() {
    return {
      "Sensor": {
        "PIN": "P1-13",
        "LPP": 2.25
      },
      "API": {
        "Base_URL": "http://10.0.0.46:8080/api",
        "Endpoints": {
          "Consume": "/beer/current/consume?volume="
        },
        "Poll_rate": 5000
      }
    }
}