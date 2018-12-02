'use strict';



  var buildingModel = require('./models/buildingModel.js');

function getAll(cb){
    buildingModel.find({},"name longitude latitude", cb);
}

module.exports.getAll=getAll;
