var express = require('express');
var router = express.Router();
var buildingModel = require('../models/buildingModel.js');
var sensorModel=require('../models/sensorModel.js');
var buildingid= "5bedd7a4d6c48801bcfa0ea5";
var selectedFloor;
var buildingaddress="110 S Market St, San Jose, CA 95113";
var aa=require("./ab.js");
var bb=require("./bts.js");
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://fion:abcd@cluster0-fomga.mongodb.net/test?retryWrites=true";
//var tbname='5bedd7a4d6c48801bcfa0ef5'.toString();
var async = require("async");
var floornumber=3;

// list  for test
router.get('/vvv', function(req, res, next) {
  bb.get_air_chart_f(buildingid,0,function(err, data,room){
    if(err){ return console.log(err) }
    var lighting=data;
 res.render('test',{
   building: lighting,
   room:room
});
});
})


router.get('/aaa', function(req, res, next) {
     var room=req.query.room;
     var start=req.query.start;
     var end=req.query.end;
   res.render('test',{
        room:room,
        start:start,
        end:end
    });
  });


// Sensor dashboard
router.get('/dashboard', function(req, res, next) {
  bb.get_lighting_chart(buildingid,function(err, data){
    if(err){ return console.log(err) }
    var lighting=data;
      bb.get_temperature_chart(buildingid,function(err, data1){
        if(err){ return console.log(err) }
        var temperature=data1;
         bb.get_humidity_chart(buildingid,function(err, data2){
           if(err){ return console.log(err) }
           var humidity=data2;
           bb.get_pressure_chart(buildingid,function(err, data3){
             if(err){ return console.log(err) }
             var pressure=data3;
             bb.get_air_chart(buildingid,function(err, data4){
               if(err){ return console.log(err) }
               var air=data4;
//other sensors here
              var floors=[];
              for (var i=1;i<=lighting.length;i++) {
              floors.push(("Floor "+i).toString());
   }
 res.render('sen_dashboard',{
   lighting: lighting,
   temperature:temperature,
   humidity:humidity,
   pressure:pressure,
   air:air,
   sum:lighting.length,
    pic: '',
    selected:-1,
    address:buildingaddress,
    floor:floors
});
});
});
});
});
});
});

// Sensor dashboard/floor
router.get('/dashboard/:id', function(req, res, next) {
  fname=req.params.id;
  bb.get_lighting_chart_f(buildingid,fname,function(err, data){
    if(err){ return console.log(err) }
    var lighting=data;
      bb.get_temperature_chart_f(buildingid,fname,function(err, data1,room){
        if(err){ return console.log(err) }
    //    var temperature=data1;
         bb.get_humidity_chart_f(buildingid,fname,function(err, data2,room2){
           if(err){ return console.log(err) }
           var humidity=data2;
           bb.get_pressure_chart_f(buildingid,fname,function(err, data3,room3){
             if(err){ return console.log(err) }
             var pressure=data3;
             bb.get_air_chart_f(buildingid,fname,function(err, data4,room4){
               if(err){ return console.log(err) }
               var air=data4;
//other sensors here

 res.render('sen_dashboard_f',{
   lighting: lighting,
   temperature:data1,
   humidity:humidity,
   pressure:pressure,
   air:air,
   sum:floornumber,
    pic: '',
    selected:fname,
    address:buildingaddress,
    floor:room,
    hroom:room2,
    aroom:room4,
    proom:room3
});
});
});
});
});
});
});

// temperature
router.get('/tem', function(req, res, next) {
  var dates=[];
 for (var m=9;m<11;m++)
   for (var d=1; d<31;d++)
   {var date="2018-"+m+"-"+d;
   dates.push(date.toString());
  }
   for (var m=11;m<12;m++)
      for (var d=1; d<7;d++)
      {
      var date="2018-"+m+"-"+d;
      dates.push(date.toString());
    }
  function ran_tem(num){
    var tem=[];
    for (var i=0;i<num;i++){
        tem.push(Math.round((69+Math.random()*3)));
    }
  return(tem);
  };
 temperature=ran_tem(dates.length);
 res.render('sen_tem',{
   dates: dates,
   temperature:temperature,
    floor:3,
    sum:3,
    selected:-1,
  address:buildingaddress,
});
});

router.get('/tem1', function(req, res, next) {
  var dates=[];
 for (var m=8;m<11;m++)
   for (var d=1; d<31;d++)
   {var date="2018-"+m+"-"+d;
   dates.push(date.toString());
  }
   for (var m=11;m<12;m++)
      for (var d=1; d<19;d++)
      {
      var date="2018-"+m+"-"+d;
      dates.push(date.toString());
    }
  function ran_tem(num){
    var tem=[];
    for (var i=0;i<num;i++){
        tem.push(Math.round((69+Math.random()*3)));
    }
  return(tem);
  };
 temperature=ran_tem(dates.length);
 res.render('sen_tem1',{
   dates: dates,
   temperature:temperature,
    floor:3,
    sum:3,
    selected:-1,
  address:buildingaddress,
});
});

router.get('/tem2', function(req, res, next) {
  var dates=[];
   for (var m=11;m<12;m++)
      for (var d=1; d<20;d++)
      {
      var date="2018-"+m+"-"+d;
      dates.push(date.toString());
    }
  function ran_tem(num){
    var tem=[];
    for (var i=0;i<num;i++){
        tem.push(Math.round((69+Math.random()*3)));
    }
  return(tem);
  };
 temperature=ran_tem(dates.length);
 res.render('sen_tem2',{
   dates: dates,
   temperature:temperature,
    floor:3,
    sum:3,
    selected:-1,
  address:buildingaddress,
});
});

router.get('/lig1', function(req, res, next) {
  var dates=[];
 for (var m=1;m<11;m++)
   for (var d=1; d<31;d++)
   {var date="2018-"+m+"-"+d;
   dates.push(date.toString());
  }
   for (var m=11;m<12;m++)
      for (var d=1; d<19;d++)
      {
      var date="2018-"+m+"-"+d;
      dates.push(date.toString());
    }
  function ran_tem(num){
    var tem=[];
    for (var i=0;i<num;i++){
        tem.push(Math.round((350+Math.random()*50)));
    }
  return(tem);
  };
 temperature=ran_tem(dates.length);
 res.render('sen_light1',{
   dates: dates,
   temperature:temperature,
    floor:3,
    sum:3,
    selected:-1,
  address:buildingaddress,
});
});

router.get('/lig', function(req, res, next) {
  var dates=[];
 for (var m=1;m<11;m++)
   for (var d=1; d<31;d++)
   {var date="2018-"+m+"-"+d;
   dates.push(date.toString());
  }
   for (var m=11;m<12;m++)
      for (var d=1; d<19;d++)
      {
      var date="2018-"+m+"-"+d;
      dates.push(date.toString());
    }
  function ran_tem(num){
    var tem=[];
    for (var i=0;i<num;i++){
        tem.push(Math.round((350+Math.random()*50)));
    }
  return(tem);
  };
 temperature=ran_tem(dates.length);
 res.render('sen_lig',{
   dates: dates,
   temperature:temperature,
    floor:3,
    sum:3,
    selected:-1,
  address:buildingaddress,
});
});

module.exports = router;
