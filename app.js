var GOOGLE_MAP_API_URL = 'https://maps.googleapis.com/maps/api/geocode/json';
var DARK_SKY_API_URL = 'https://api.darksky.net/forecast';

var getLocation = function(search){
        
};

var getGoogleMapData = function(search, callback){
    var settings ={
        url: GOOGLE_MAP_API_URL,
        data: {
            key: 'AIzaSyBRrxoPQ8s3PCSjoj__Na6QAFwA9yhcIy4',
            address: search
        },
        dataType: 'json',
        type: 'GET',
        success: callback
    };

    $.ajax(settings);
};


var log = function(data){
    console.log(data);
    if(data.status === "OK"){
        console.log(data.results[0].geometry.location.lat);
        console.log(data.results[0].geometry.location.lng)
    }
    else
        console.log(data.status);
};

var getDarkSkyData = function(data){
   if(data.status === "OK"){
        var lat = data.results[0].geometry.location.lat;
        var lng = data.results[0].geometry.location.lng;
        var key = '52048a5f9e5bf2d1771414fe6a221c8e'

        var settings ={
            url: DARK_SKY_API_URL + `/${key}/${lat},${lng}`,
            dataType: 'jsonp',
            type: 'GET',
            crossDomain: true,
            success: displayResults
        };

        $.ajax(settings);
    }
    else{
        displayResults(data.status);
    };
};

var displayResults = function(data){
    console.log(data);
}

getGoogleMapData("Paris", getDarkSkyData);