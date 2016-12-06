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

var shopping_search = {
    snowy: ["winter boots", "hats", "scarves"],
    rainy: ["rain boots", "umbrellas", "ponchos"],
    sunny: ["summer dress", "sunglasses", "sunscreen"],
    okay: ["jeans", "shirts", "knicknacks"]
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
   state.location = data.results[0];

   if(data.status === "OK"){
        var lat = state.location.geometry.location.lat;
        var lng = state.location.geometry.location.lng;

        var settings ={
            url: DARK_SKY.url + DARK_SKY.key + `/${lat},${lng}`,
            dataType: 'jsonp',
            type: 'GET',
            success: displayResults
        };

        $.ajax(settings);
    }
    else{
        displayError(data.status);
    };
};

var displayError = function(error){
    $('.search-weather-result').html('<p class = "error">' + error + '</p>');
}; 

var displayResults = function(data){
    state.current_weat = data.currently;
    state.weekly_weat = data.daily;

    displayWeatherResults();
    displayShoppingResults(getMood(state.current_weat.summary), getMood(state.weekly_weat.summary));
};

var displayWeatherResults = function(){
    var displayLocationText = '<h3 class="location">' + state.location.formatted_address + '</h3>';
    var displayText = '<p>It looks like it will be ' + state.current_weat.summary.toLowerCase() + 
                      ' today. The rest of the week seems to be ' + 
                      getMood(state.weekly_weat.summary) + ', there\'s ' + 
                      state.weekly_weat.summary.charAt(0).toLowerCase() + 
                      state.weekly_weat.summary.slice(1) + '</p>';

    $('.search-weather-result').html(displayLocationText + displayText);

};

var displayShoppingResults = function(current_mood, weekly_mood){
    //TODO: replace placeholder text with search results based on what the mood is
    var displayText = 'Current Mood: ' + current_mood + '<br>Weekly Mood : ' + weekly_mood;
    $('.search-sale-result').html(displayText);
};

var getMood = function(text){
    var _text = text.toLowerCase().split(" ");

    if(_text.indexOf('rain') > -1)
        return "rainy";
    if(_text.indexOf('sunny') > -1)
        return "sunny";
    if(_text.indexOf('snow') > -1)
        return "snowy";
    return "okay";
};

//Listeners
$('#search-form').submit(function(e){
    e.preventDefault();
    var input = $(this).find('input[name="search-input"]').val();
    getGoogleMapData(input, getDarkSkyData);
})
