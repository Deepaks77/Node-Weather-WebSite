const request=require("request");
const forecast = (address, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=3ec8c9d2037d59867c7c9447aa869a57&query=' + encodeURIComponent(address) + '&units=m'
    request({ url, json: true }, (error, response, body) => {
        if (error) {
            callback("unable to connect weather service", undefined);
        }
        else if (body.error) {
            callback("Unable to find Location , Try Another Search", undefined);
        }
        else {
            const data = body.current;
            const weatherdesc=data.weather_descriptions[0];
            const {temperature:temp,feelslike,weather_icons:weatherIcon}=data;

            callback(undefined, {
                weatherdesc,
                temp,
                feelslike,
                weatherIcon
            });
        }
    })
}

module.exports = forecast