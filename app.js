var GOOGLE_MAP = {
    url: 'https://maps.googleapis.com/maps/api/geocode/json',
    key: 'AIzaSyBRrxoPQ8s3PCSjoj__Na6QAFwA9yhcIy4'
}

var DARK_SKY ={
    url: 'https://api.darksky.net/forecast/',
    key: '52048a5f9e5bf2d1771414fe6a221c8e'
}

//Do I need this? Do I want to keep this data for any reason?
/*
var state = {
    location: {},
    current_weat: {},
    weekly_weat: {}
}
*/
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
            //Should probably build a new function which will display both results, 
            //weather w/ mood and shopping results
            success: displayResults
        };

        $.ajax(settings);
    }
    else{
        displayError(data.status);
    };
};

var displayError = function(error){
    $('.search-result').html(error);
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

    displayWeatherResults(current, weekly);
}

var displayWeatherResults = function(current, weekly){
    var displayText = '<p>It looks like it will be ' + current.summary.toLowerCase() + 
                      ' today. The rest of the week seems to be ' + 
                      getMood(weekly.summary) + ', there\'s ' + 
                      weekly.summary.charAt(0).toLowerCase() + 
                      weekly.summary.slice(1) + '</p>';

    $('.search-result').html(displayText);

};

var displayShoppingResults = function(weather_summary){

};

//lookup JavaScript in function
var getMood = function(text){
    var _text = text.toLowerCase().split(" ");

    if(_text.indexOf('rain') > -1)
        return "rainy";
    if(_text.indexOf('sunny') > -1)
        return "sunny";
    return "okay";
};

getGoogleMapData("Stinson", getDarkSkyData);