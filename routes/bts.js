var express = require('express');
var aa=require("./ab.js");
var async = require("async");

function maxMinAvg(arr) {
    var max = arr[0];
    var min = arr[0];
    var sum = arr[0]; //changed from original post
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
        if (arr[i] < min) {
            min = arr[i];
        }
        sum = sum + arr[i];
    }
    return [max,Math.round(sum/arr.length),min];
}



exports.get_temperature_chart= function(buildingid, res) {
  aa.get_all_temperature(buildingid,function(err, data){
    var result=[];
    async.each(data, function(ele_in_data, next1){
      var array=[];
       async.each(ele_in_data, function(ele_in_data1, next2){
           aa.get_sensor_value(ele_in_data1, function(err, data2){
              if(err){
                      return next(err);
                      }
                  array.push(data2);
                  next2();
                })
                 }, function(err){
                 if(err){ }
                     result.push(maxMinAvg(array));
                     next1();
                  });
      },function(err){
          if(err){ }
       res(null,result)
  });
  });
}

exports.get_humidity_chart= function(buildingid, res) {
  aa.get_all_humidity(buildingid,function(err, data){
    var result=[];
    async.each(data, function(ele_in_data, next1){
      var array=[];
       async.each(ele_in_data, function(ele_in_data1, next2){
           aa.get_sensor_value(ele_in_data1, function(err, data2){
              if(err){
                      return next(err);
                      }
                  array.push(data2);
                  next2();
                })
                 }, function(err){
                 if(err){ }
                     result.push(maxMinAvg(array));
                     next1();
                  });
      },function(err){
          if(err){ }
       res(null,result)
  });
  });
}

exports.get_pressure_chart= function(buildingid, res) {
  aa.get_all_pressure(buildingid,function(err, data){
    var result=[];
    async.each(data, function(ele_in_data, next1){
      var array=[];
       async.each(ele_in_data, function(ele_in_data1, next2){
           aa.get_sensor_value(ele_in_data1, function(err, data2){
              if(err){
                      return next(err);
                      }
                  array.push(data2);
                  next2();
                })
                 }, function(err){
                 if(err){ }
                     result.push(maxMinAvg(array));
                     next1();
                  });
      },function(err){
          if(err){ }
          var floor=[];
       res(null,result)
  });
  });
}

exports.get_air_chart= function(buildingid, res) {
  aa.get_all_air(buildingid,function(err, data){
    var result=[];
    async.each(data, function(ele_in_data, next1){
      var array=[];
       async.each(ele_in_data, function(ele_in_data1, next2){
           aa.get_sensor_value(ele_in_data1, function(err, data2){
              if(err){
                      return next(err);
                      }
                  array.push(data2);
                  next2();
                })
                 }, function(err){
                 if(err){ }
                     result.push(maxMinAvg(array));
                     next1();
                  });
      },function(err){
          if(err){ }
          var floor=[];
       res(null,result)
  });
  });
}

exports.get_lighting_chart= function(buildingid, res) {
  aa.get_all_lighting(buildingid,function(err, data){
    var result=[];
    async.each(data, function(ele_in_data, next1){
      var array=[];
       async.each(ele_in_data, function(ele_in_data1, next2){
           aa.get_sensor_value(ele_in_data1, function(err, data2){
              if(err){
                      return next(err);
                      }
                  array.push(data2);
                  next2();
                })
                 }, function(err){
                 if(err){ }
                     result.push(maxMinAvg(array));
                     next1();
                  });
      },function(err){
          if(err){ }
       res(null,result)
  });
  });
}

exports.get_temperature_chart_f= function(buildingid,fname,res) {
  aa.get_temperature_byfloor(buildingid,fname,function(err, data,room,pic){
    var result=[];
    async.each(data, function(ele_in_data, next1){
           aa.get_sensor_value(ele_in_data, function(err, data2){
              if(err){
                      return next(err);
                      }
                  result.push(data2);
                  next1();
                })
                 }, function(err){
                 if(err){ }
               res(null,result,room,pic)
                      });
  });
}

exports.get_air_chart_f= function(buildingid,fname,res) {
  aa.get_air_byfloor(buildingid,fname,function(err, data,room){
    var result=[];
    async.each(data, function(ele_in_data, next1){
           aa.get_sensor_value(ele_in_data, function(err, data2){
              if(err){
                      return next(err);
                      }
                  result.push(data2);
                  next1();
                })
                 }, function(err){
                 if(err){ }
               res(null,result,room)
                      });
  });
}

exports.get_humidity_chart_f= function(buildingid,fname,res) {
  aa.get_humidity_byfloor(buildingid,fname,function(err, data,room){
    var result=[];
    async.each(data, function(ele_in_data, next1){
           aa.get_sensor_value(ele_in_data, function(err, data2){
              if(err){
                      return next(err);
                      }
                  result.push(data2);
                  next1();
                })
                 }, function(err){
                 if(err){ }
               res(null,result,room)
                      });
  });
}

exports.get_pressure_chart_f= function(buildingid,fname,res) {
  aa.get_pressure_byfloor(buildingid,fname,function(err, data,room){
    var result=[];
    async.each(data, function(ele_in_data, next1){
           aa.get_sensor_value(ele_in_data, function(err, data2){
              if(err){
                      return next(err);
                      }
                  result.push(data2);
                  next1();
                })
                 }, function(err){
                 if(err){ }
               res(null,result,room)
                      });
  });
}

exports.get_lighting_chart_f= function(buildingid,fname,res) {
  aa.get_lighting_byfloor(buildingid,fname,function(err, data,room){
    var result=[];
    async.each(data, function(ele_in_data, next1){
           aa.get_sensor_value(ele_in_data, function(err, data2){
              if(err){
                      return next(err);
                      }
                  result.push(data2);
                  next1();
                })
                 }, function(err){
                 if(err){ }
               res(null,result,room)
                      });
  });
}

exports.get_lighting_chart_tf= function(buildingid,fname,start,end,res) {
  aa.get_lighting_byfloor(buildingid,fname,function(err, data,room){
    var result=[];
    async.each(data, function(ele_in_data, next1){
           aa.get_sensor_value_time(ele_in_data, start,end,function(err, data2){
              if(err){
                      return next(err);
                      }
                  result.push(data2);
                  next1();
                })
                 }, function(err){
                 if(err){ }
               res(null,result,room)
                      });
  });
}

exports.get_temperature_chart_tf= function(buildingid,fname,start,end,res) {
  aa.get_temperature_byfloor(buildingid,fname,function(err, data,room,pic){
    var result=[];
    async.each(data, function(ele_in_data, next1){
           aa.get_sensor_value_time(ele_in_data, start,end,function(err, data2){
              if(err){
                      return next(err);
                      }
                  result.push(data2);
                  next1();
                })
                 }, function(err){
                 if(err){ }
               res(null,result,room)
                      });
  });
}

exports.get_humidity_chart_tf= function(buildingid,fname,start,end,res) {
  aa.get_humidity_byfloor(buildingid,fname,function(err, data,room){
    var result=[];
    async.each(data, function(ele_in_data, next1){
           aa.get_sensor_value_time(ele_in_data, start,end,function(err, data2){
              if(err){
                      return next(err);
                      }
                  result.push(data2);
                  next1();
                })
                 }, function(err){
                 if(err){ }
               res(null,result,room)
                      });
  });
}

exports.get_air_chart_tf= function(buildingid,fname,start,end,res) {
  aa.get_air_byfloor(buildingid,fname,function(err, data,room){
    var result=[];
    async.each(data, function(ele_in_data, next1){
           aa.get_sensor_value_time(ele_in_data, start,end,function(err, data2){
              if(err){
                      return next(err);
                      }
                  result.push(data2);
                  next1();
                })
                 }, function(err){
                 if(err){ }
               res(null,result,room)
                      });
  });
}

exports.get_pressure_chart_tf= function(buildingid,fname,start,end,res) {
  aa.get_pressure_byfloor(buildingid,fname,function(err, data,room){
    var result=[];
    async.each(data, function(ele_in_data, next1){
           aa.get_sensor_value_time(ele_in_data, start,end,function(err, data2){
              if(err){
                      return next(err);
                      }
                  result.push(data2);
                  next1();
                })
                 }, function(err){
                 if(err){ }
               res(null,result,room)
                      });
  });
}
