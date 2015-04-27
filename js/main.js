document.addEventListener('DOMContentLoaded', function(event) {
  
});

geocoder = new google.maps.Geocoder();

var checkAddress = function() {
  var address = document.getElementById('address').value;

  if (address !== null && address !== "") {
    geocoder.geocode({'address': address}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        var returned = results;
        //console.log(returned);
        
        if (returned.length > 1) {
          for (i = 0; i < returned.length; i++) {
            var returnedAddress = [];
            var parent = document.getElementById('possible');
            child = document.createElement('p');
            child.setAttribute('class', 'possibilities');
            node = document.createTextNode(returned[i].formatted_address);
            child.appendChild(node);
            parent.appendChild(child);
          }
          alert('there seems to have been multiple matches, refine your query and try again');
        } else {
          document.getElementById('address').value = returned[0].formatted_address;
          //console.log(returned[0].geometry.location.k + ',' + returned[0].geometry.location.D);
          document.getElementById('latitude').value = returned[0].geometry.location.k;
          document.getElementById('longitude').value = returned[0].geometry.location.D;
          document.getElementById('coordinate').value = returned[0].geometry.location.k + ',' + returned[0].geometry.location.D;
        }
      } else {
        alert('geocode was not successful for the following reasons: ' + status);
      }
    });
  } else {
    alert('the address field must be filled to convert');
  }
};

var toLatLong = function() {
  var possible = document.getElementById('possible');
  
  if (possible.hasChildNodes()) {
    var possibilities = $('.possibilities');
    possibilities.remove();
    checkAddress();
  } else {
    checkAddress();
  }
};





var checkLatLong = function() {
  var latitude = document.getElementById('latitude');
  var longitude = document.getElementById('longitude');
  //create latlng object
  var latlng = new google.maps.LatLng(parseFloat(latitude), parseFloat(longitude));
  
  if (latitude, longitude !== null && latitude,longitude !== "") {
    if (latlng !== null) {
      console.log('not null');
      latlng.k = parseFloat(latitude);
      latlng.D = parseFloat(longitude);
      console.log(latlng.k + ',' + latlng.D);
      console.log('latlng');
      geocoder.geocode({'latLng': latlng}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            var returned = results;
            //console.log(returned);
            
            document.getElementById('address').value = returned[0].formatted_address;
          } else {
            alert('geocode was not successful for the following reasons: ' + status);
          }
        });
    } else {
      console.log(latlng);
      geocoder.geocode({'latLng': latlng}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          var returned = results;
          //console.log(returned);
          
          document.getElementById('address').value = returned[0].formatted_address;
        } else {
          alert('geocode was not successful for the following reasons: ' + status);
        }
      });
    }
  } else {
    alert('the latitude and longitude fields must be filled to convert to address');
  }
};

var toAddress = function() {
  checkLatLong();
};