function initMap() {
  var aa=require("./test.js");
  aa.getAll(function(err,result){
    document.getElementById("map").innerHTML = result;
    });
          /*  for (var i=0;i<result.length;i++){
              arr=[result[i].name,parseFloat(result[i].longitude),parseFloat(result[i].latitude),result[i]._id.toString()];
              maplist.push(arr);
            }*/

          /*  var map = new google.maps.Map(document.getElementById('map'), {
              zoom: 14,
              center: {lat: 37.330528, lng: -121.88884 }
            });
      /*      for (var i=0;i<maplist.length;i++){
                var marker = new google.maps.Marker({
                  position: {
                    lat: maplist[i][1],
                    lng: maplist[i][2]
                  },
                  map: map
                });
                attachSecretMessage(marker, maplist[i][0],maplist[i][3]);
              });
            });
/*            });

  function attachSecretMessage(marker, name,id) {
      var infowindow = new google.maps.InfoWindow({
        content: name+"</br><a href='/buildings/"+id+"/dashboard'>VIEW IOT</a>"
      });

      marker.addListener('click', function() {
        infowindow.open(marker.get('map'), marker);
      });
    };   */
}
