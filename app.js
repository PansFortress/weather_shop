var GOOGLE_MAP_API_URL = 'https://maps.googleapis.com/maps/api/geocode/json';
var DARK_SKY_API_URL = 'https://api.darksky.net/forecast/';

var getLocation = function(search){
        
};

var getGoogleMapResponse = function(search, callback){
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

var getDarkSkyResponse = function(data, callback){
   if(data.status === "OK"){
        var lat = data.results[0].geometry.location.lat;
        var lng = data.results[0].geometry.location.lng;
        //get DARKSKYRESPONSE
    }
    else{
        displayResults(data.status);
    };
};

var displayResults = function(data, element){
    var toDisplay = "The data is : " + data;
    element.html(toDsiplay);
}

getGoogleMapResponse("New York City, NY", log);