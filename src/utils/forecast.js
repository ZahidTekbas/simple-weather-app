const request = require('request')
const DARKSKYAPIKEY = 'dark sky api key here'

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/' + DARKSKYAPIKEY + '/' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, 
                body.daily.data[0].summary + 
                ' It is currently ' + body.currently.temperature + 
                ' degress out. This high today is ' 
                + body.daily.data[0].temperatureHigh + 
                ' with a low of ' + body.daily.data[0].temperatureLow + 
                '. There is a ' + 
                body.currently.precipProbability +
                 '% chance of rain.', body.daily.data[0].icon)
        } 
    })
}

module.exports = forecast