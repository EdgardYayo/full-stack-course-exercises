import CountryDetail from "./CountryDetail";

const Countries = ({ countries, handleShow, weather }) => {
    if(countries.length > 10) {
        return <p>Too many matches, especify another filter</p>
    } else if(countries.length === 10 || (countries.length > 1 && countries.length < 10)) {
        return (
            <div>
                {countries.map((country) => <p key={country.name.common}>{country.name.common} <button onClick={() => handleShow(country.name.common)}>Show</button></p>)}
            </div>
        )
    } else if(countries.length === 1) {
        let country = countries[0];
        return (<CountryDetail country={country} weather={weather}/>);
    } else {
        return null;
    }


}

export default Countries;