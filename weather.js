/**
 * Generates current weather data for the event location
 * @class
 * @param {number} - latitude
 * @param {number} - longitude
 */

class Weather {
    constructor(lat, lon) {
        this.lat = lat;
        this.lon = lon;
        this.displayArea = {
            city: $("#widgetCity"),
            range: $("#widgetRange"),
            temp:$("#widgetTemp"),
            description: $("#widgetTempDesc"),
            icon:$("#widgetIcon")
        };
        this.getWeatherDataSuccess = this.getWeatherDataSuccess.bind(this);
        this.serverError = this.serverError.bind(this);
        this.sendDataToWidget = this.sendDataToWidget.bind(this);
        this.getWeatherData();
    }

    getWeatherData() {
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
            success: this.getWeatherDataSuccess,
            error: this.serverError
        });
    }

    getWeatherDataSuccess(response){
        if(response){
            const weatherData = {
                'city name': response.name,
                'temperature range': `${(response.main.temp_min).toFixed(0)}°F-${(response.main.temp_max).toFixed(0)}°F`,
                'current temperature': `${response.main.temp.toFixed(0)}°F`,
                'weather description': response.weather[0].description,
                'icon': response.weather[0].icon
            };
            this.sendDataToWidget(weatherData);
        }
    }

    serverError(){
        console.log('Failed to connect to the Server for weather data');
    }

    sendDataToWidget(weatherObject){
        let icon = weatherObject['icon'];
        let iconUrl = `https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/${icon}.png`;
        let completeIcon = $("<img>").attr({
            'src': iconUrl,
            'alt': weatherObject['weather description'],
            'height': '80rem'
        });

        this.displayArea.city.text(weatherObject['city name']);
        this.displayArea.range.text(weatherObject['temperature range']);
        this.displayArea.temp.text(weatherObject['current temperature']);
        this.displayArea.description.text(weatherObject['weather description']);
        this.displayArea.icon.append(completeIcon);
    }
}
