var GOOGLE_MAP = {
    url: 'https://maps.googleapis.com/maps/api/geocode/json',
    key: 'AIzaSyBRrxoPQ8s3PCSjoj__Na6QAFwA9yhcIy4'
}

var DARK_SKY ={
    url: 'https://api.darksky.net/forecast/',
    key: '52048a5f9e5bf2d1771414fe6a221c8e'
}

//Do I need this? Do I want to keep this data for any reason?
var state = {
    location: {},
    current_weat: {},
    weekly_weat: {}
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
    var current = {
        temperature: data.currently.apparentTemperature,
        summary: data.currently.summary,
        icon: data.currently.icon
    };

    var weekly = {
        icon: data.daily.icon,
        summary: data.daily.summary
    };

    var displayText = '<p>It looks like it will be ' + `${current.summary}`.toLowerCase() + 
                      ' today. The rest of week seems to be PLACEHOLDER_FUNCTION, there\'s ' + `${weekly.summary}`

};

//lookup JavaScript in function
var getMood = function(text){

}

getGoogleMapData("11372", getDarkSkyData);