const request = require('postman-request');

const units = 'f';
const apiKey = '6d096509d1e4a330738b9493fcf31a6b';

const forecast = (longitude, latitude, callback) => {
    longitude = encodeURIComponent(longitude);
    latitude = encodeURIComponent(latitude);
    const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${latitude},${longitude}&units=${units}`
    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined)
        }        
        else {
            const {weather_descriptions: weather, temperature, feelslike} = body.current;
            callback(undefined, `Current weather: ${weather[0]}. The temperature is ${temperature}°F. It feels like ${feelslike}°F.`);
        }
    });
}

module.exports = forecast;
