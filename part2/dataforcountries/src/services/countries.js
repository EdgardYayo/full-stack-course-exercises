import axios from 'axios';
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all"
// const baseUrlApiWeather = "https://api.openweathermap.org/data/2.5/weather?q="
const baseUrlApiWeather = "https://api.openweathermap.org/data/2.5/weather?"

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then((response) => response.data);
}

const getWeatherForCountryCapital = (lat, lon) => {
    // const request = axios.get(`${baseUrlApiWeather}${capital}&appid=${import.meta.env.VITE_API_KEY}`);
    const request = axios.get(`${baseUrlApiWeather}lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_API_KEY}`);
    return request.then((response) => response.data);
}

export { getAll, getWeatherForCountryCapital }