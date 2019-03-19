class Weather {
    constructor() {
        this.getWeatherData = this.getWeatherData.bind(this);

        this.getWeatherData(33.66, -117.82); //currently set for Irvine, figure out how to do this on each map icon click
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

                let weatherData = {
                    'city name': data.name,
                    'latitude': data.coord.lat,
                    'longitude': data.coord.lon,
                    'current temperature': data.main.temp.toFixed(0),
                    'temperature range': `${(data.main.temp_min).toFixed(0)}-${(data.main.temp_max).toFixed(0)}`,
                    'weather description': data.weather[0].description
                }

                console.log(weatherData);
            },
            error: function () {
                console.log('something went wrong getting weather data');
            }
        });
    }
}
