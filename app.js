var GOOGLE_MAP = {
    url: 'https://maps.googleapis.com/maps/api/geocode/json',
    key: 'AIzaSyBRrxoPQ8s3PCSjoj__Na6QAFwA9yhcIy4'
}

var DARK_SKY ={
    url: 'https://api.darksky.net/forecast/',
    key: '52048a5f9e5bf2d1771414fe6a221c8e'
}

var ETSY = {
    url: 'https://openapi.etsy.com/v2/listings/active.js',
    key: '3hxpbrdilxv6td1xny90v49u'
}

//Do I need this? Do I want to keep this data for any reason?

var state = {
    location: {},
    current_weat: {},
    weekly_weat: {},
    current_mood: "",
    weekly_mood: "",
    search_term: ""
}

var shopping_search = {
    snowy: ["winter boots", "hats", "scarves", "winter gloves"],
    rainy: ["rain boots", "sturdy umbrellas", "rain ponchos"],
    sunny: ["summer dress", "sunglasses", "sunscreen"],
    okay: ["jeans", "shirts", "sneakers"]
}

var getGoogleMapData = function(search){
    var settings ={
        url: GOOGLE_MAP.url,
        data: {
            key: GOOGLE_MAP.key,
            address: search
        },
        dataType: 'json',
        type: 'GET',
        success: getDarkSkyData
    };

    $.ajax(settings);
};

var getEtsyData = function(search){
    var settings = {
        url: ETSY.url,
        data: {
            api_key: ETSY.key,
            keywords: search,
            includes: "MainImage",
            limit: 25
        },
        dataType: 'jsonp',
        type: 'GET',
        success: displayShoppingResults
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

var getShoppingTerm = function(key){
    var index = Math.floor(Math.random() * shopping_search[key].length);
    return shopping_search[key][index];
}

//TODO: Refactor getEtsy API call out of display function
var displayResults = function(data){
    state.current_weat = data.currently;
    state.weekly_weat = data.daily;
    state.current_mood = getMood(state.current_weat.summary);
    state.weekly_mood = getMood(state.weekly_weat.summary);
    state.search_term = getShoppingTerm(state.weekly_mood);

    getEtsyData(state.search_term);
    displayWeatherResults();
};

var displayWeatherResults = function(){
    var displayLocationText = '<h2 class="location">' + state.location.formatted_address + '</h2>';
    var displayText = '<p>It looks like it will be ' + state.current_weat.summary.toLowerCase() + 
                      ' today. The rest of the week seems to be ' + 
                      getMood(state.weekly_weat.summary) + ', there\'s ' + 
                      state.weekly_weat.summary.charAt(0).toLowerCase() + 
                      state.weekly_weat.summary.slice(1) + '</p><hr>';

    $('.search-weather-result').html(displayLocationText + displayText);

};

var displayShoppingResults = function(data){
    var displayHTML = "";
    if(data.ok){
        displayHTML += ('<h3>Based on the weather for the week, might we suggest some fancy schmancy ' + state.search_term + '.</h3>');
        for(item in data.results){   
            console.log(data.results[item])
            displayHTML += ('<div class = "result-item  three columns">' + 
                '<a href = "' + data.results[item].url + 
                '"><img src="' + data.results[item].MainImage.url_170x135 + '">' +
                '<p class="result-item-title">'+data.results[item].title + 
                '</p><p class="result-item-price">$' + data.results[item].price + '</p></a></div>');
        }
        $('.search-sale-result').html(displayHTML);
    }
    else(console.log("ERROR", data));
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
    getGoogleMapData(input);
})
