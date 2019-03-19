class Weather {
    constructor() {

        this.getWeatherData = this.getWeatherData.bind(this);

        this.getWeatherData(33.66, -117.82);
    }

    getWeatherData(lat, lon) {
        this.lat = lat;
        this.lon = lon;

        $.ajax({
            url: 'http://api.openweathermap.org/data/2.5/weather',
            dataType: 'json',
            method: 'get',
            data: {
                APPID: '3b66653d29e493f25f6edb9f07bd2ba9',
                lat: this.lat, 
                lon: this.lon,
                units: 'imperial',
            },
            success: function (data) {
                console.log('we got data!', data);

                console.log('city name: ', data.name);
                console.log('latitude: ', data.coord.lat);
                console.log('longitude: ', data.coord.lon);
                console.log('current temperature: ', data.main.temp.toFixed(0)); //removes the decimals
                console.log(`temperature range: ${(data.main.temp_min).toFixed(0)}-${(data.main.temp_max).toFixed(0)}`);
                console.log('weather description: ', data.weather[0].description);
            },
            error: function () {
                console.log('something went wrong!');
            }
        });
    }
}
