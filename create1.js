var sensor = require("./models/sensorModel.js");

//insert
function insert() {

  var sensor = new SensorSchema({
    sensorName: aa,
    sensorType: aa,
    statistics: [{
      timestamp: 1517506200000,
      status: 1,
      value: 15,
      dataType: String
    }]
    });


  building.save(function (err, res) {

      if (err) {
          console.log("Error:" + err);
      }
      else {
          console.log("Res:" + res);
      }

  });
}

insert();
