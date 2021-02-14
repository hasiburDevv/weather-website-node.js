const request = require('request')

const forecast = (lat, lon,callback) => {
    //https://openweathermap.org/api/one-call-api
    
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+encodeURIComponent(lat)+'&lon='+encodeURIComponent(lon)+'&exclude=minutely,hourly,alerts&appid=68159834d6f44fd081c39c30ec18edbe'

    request({ url: url, json: true }, (error, {body}) => {
        if(error){
            callback(`Unable to connect to weather service!`, undefined)
        }else if(body.message){
            callback(`Unable to find location`, undefined)
        }else{
            callback(undefined, `Currently its ${body.current.temp} degrees out but feels like ${body.current.feels_like} degrees and here it's ${body.daily[0].weather[0].description} the day.`)
        }
    })
}

module.exports = forecast
