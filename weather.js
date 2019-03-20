class Weather {
    constructor() {
        this.getWeatherData = this.getWeatherData.bind(this);
        this.sendDataToWidget = this.sendDataToWidget.bind(this);
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
            success: data => {
                console.log('we got data!', data);

                let weatherData = {
                    'city name': data.name,
                    'latitude': data.coord.lat,
                    'longitude': data.coord.lon,
                    'current temperature': data.main.temp.toFixed(0),
                    'temperature range': `${(data.main.temp_min).toFixed(0)}-${(data.main.temp_max).toFixed(0)}`,
                    'weather description': data.weather[0].description,
                    'icon': data.weather[0].icon
                };

                this.sendDataToWidget(weatherData); //renders the info onto the dom
            },
            error: function () {
                console.log('something went wrong getting weather data');
            }
        });
    }

    sendDataToWidget(weatherObject){
        console.log(weatherObject);

        let icon = weatherObject['icon'];
        let iconUrl = `https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/${icon}.png`;
        let completeIcon = $("<img>").attr({
            'src': iconUrl,
            'alt': weatherObject['weather description'],
            'height': '80rem'
        });

        $("#widgetCity").text(weatherObject['city name']);
        $("#widgetTemp").text(`${weatherObject['current temperature']}°F`);
        $("#widgetTempDesc").text(`${weatherObject['weather description']}`);
        $("#widgetIcon").append(completeIcon);
    }
}
