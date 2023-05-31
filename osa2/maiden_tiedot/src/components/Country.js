import WeatherService from '../services/weather'
import { useState, useEffect } from 'react'

const Lang = (props) => {
    return <li>{props.value}</li>
}

const Icon = (props) => {
    const url = 'https://openweathermap.org/img/wn/' + props.icon + '@2x.png'
    return <img src={url}/>
}

const Temp = (props) => {
    const celsius = props.kelvins - 273.15
    return <div>temperature {celsius.toFixed(2)} Celsius</div>
}

const Country = (props) => {
    const country = props.country
    const langs = country.languages
    console.log(langs)
    const lat = country.capitalInfo.latlng[0]
    const lng = country.capitalInfo.latlng[1]
    const [weatherData, setWeatherData] = useState(null)
    
    useEffect(() => {
        WeatherService.getWeather(lat,lng)
            .then(response => {
                console.log('data', response)
                setWeatherData(response)
            })
    },[country])

    return (
    <div>
        <h1>{country.name.common}</h1>
        <div>capital {country.capital}</div>
        <div>area {country.area}</div>
        <p><b>languages:</b></p>
        {Object.entries(langs).map(([key, name]) => (
            <Lang key={key} value={name} />
        ))}
        <br/>
        <img src={country.flags.png} />
        <h1>Weather in {country.capital}</h1>
        {weatherData && <Temp kelvins={weatherData.main.temp}/>}
        {weatherData && <Icon icon={weatherData.weather[0].icon}/>}
        {weatherData && <div>wind {weatherData.wind.speed} m/s</div>}
    </div>
    )
}

export default Country