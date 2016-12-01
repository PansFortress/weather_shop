var GOOGLE_MAP = {
    url: 'https://maps.googleapis.com/maps/api/geocode/json',
    key: 'AIzaSyBRrxoPQ8s3PCSjoj__Na6QAFwA9yhcIy4'
}

var DARK_SKY ={
    url: 'https://api.darksky.net/forecast/',
    key: '52048a5f9e5bf2d1771414fe6a221c8e'
}

var getGoogleMapData = function(search, callback){
    var settings ={
        url: GOOGLE_MAP.url,
        data: {
            key: GOOGLE_MAP.key,
            address: search
        },
        dataType: 'json',
        type: 'GET',
        success: callback
    };

    $.ajax(settings);
};

var getDarkSkyData = function(data){
   if(data.status === "OK"){
        var lat = data.results[0].geometry.location.lat;
        var lng = data.results[0].geometry.location.lng;

        var settings ={
            url: DARK_SKY.url + DARK_SKY.key + `/${lat},${lng}`,
            dataType: 'jsonp',
            type: 'GET',
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

getGoogleMapData("Haikou", getDarkSkyData);