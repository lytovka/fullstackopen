import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { isNull } from 'util';

const CountryInfo = ({ country }) => {

    const [weather, setWeather] = useState({});

    const languagesList = country.languages.map((lang) => {
        return <li key={lang.name} >{lang.name}</li>
    });

    const weatherAPIbody = 'http://api.apixu.com/v1/current.json?key=';
    const key = '1a823d46dc284174841144612192006';
    const weatherAPIrequest = weatherAPIbody.concat(key.concat("&q=".concat(country.capital)));


    useEffect(() => {
        axios.get(weatherAPIrequest)
            .then((response) => {
                setWeather(response.data);
            });
    }, []);

    const displayWeather = () => {
        if (weather.hasOwnProperty('current'))
            return (
                <>
                    <p><strong>temperature:</strong> {weather.current.temp_c} celcius</p>
                    <img src={weather.current.condition.icon} alt={weather.current.condition.text}></img>
                    <p><strong>wind:</strong> {weather.current.wind_kph}{weather.current.wind_dir}</p>
                </>
            );
        else {
            return (
                <p>please stand</p>
            );
        }
    };

    // Flag won't show up if a country's code doesn't match with its first
    //3 letters

    const countryCode = country.name.toLocaleLowerCase().substring(0, 3);
    const sourceImage = ("https://restcountries.eu/data/").concat(countryCode + ".svg");

    return (
        <>
            <h1>{country.name}</h1>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <h2>Languages</h2>
            <ul>{languagesList}</ul>
            <img width="100px" src={sourceImage} alt={country.name}></img>
            <h3>Weather in {country.capital}</h3>
            {displayWeather()}
        </>
    );
}

export default CountryInfo