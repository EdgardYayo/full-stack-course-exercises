const CountryDetail = ({ country, weather }) => {

    return (
        <div>
            <h2>{country.name.common}</h2>
            <p>Capital: {country.capital[0]}</p>
            <p>Area: {country.area}</p>
            <h4>languages</h4>
            {Object.values(country.languages).map((lang) => <p>{lang}</p>)}
            <img src={country.flags.png} />
            {weather !== null && (
                <>
                    <h3>Weather in {country.capital[0]}</h3>
                    <p>Temperature {Math.round(weather.main.temp - 273.15)} Celsius</p>
                    <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
                    <p>Wind {weather.wind.speed} m/s</p>
                </>
            )}
        </div>
    )
}

export default CountryDetail;