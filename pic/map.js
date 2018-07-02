var map;
var infowindow;
var service;
var c;
function initMap() {
    window.navigator.geolocation.getCurrentPosition(myFlow);
}

function myFlow(pos) {

    c = {lat: pos.coords.latitude, lng: pos.coords.longitude};
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 16,
      center: c
    });
    var marker = new google.maps.Marker({
      position: c,
      map: map
    });
    infowindow = new google.maps.InfoWindow();
    service = new google.maps.places.PlacesService(map);
}

function search(){
    // !!!
    for(var i = 0; i < markerArray.length; i++) {
        markerArray[i].setMap(null);
    }
    markerArray = [];
    service.nearbySearch({
      location: c,
      radius: 1500,
      type: 'restaurant',
      keyword: document.getElementById("s").value
    }, callback);
}

function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
          createMarker(results[i]);
          console.log(results[i]);
      }
    }
}
var markerArray = [];
function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        icon: {
          url: 'https://developers.google.com/maps/documentation/javascript/images/circle.png',
          anchor: new google.maps.Point(10, 10),
          scaledSize: new google.maps.Size(20, 34)
        }
    });
    // !!!
    markerArray.push(marker);
    google.maps.event.addListener(marker, 'click', function() {
        content = place.name;
        if(place.opening_hours != undefined && 
           place.opening_hours.open_now == true){
            content = content + "<br>狀態:<span style='color:red;'>開</span>" ;
        } else{
            content = content + "<br>狀態:<span style='color:green;'>關</span>";
        }
        
        infowindow.setContent(content);
        infowindow.open(map, this);
    });
}
