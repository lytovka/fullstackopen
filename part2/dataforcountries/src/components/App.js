import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './Filter'
import Country from './Country'
import Countries from './Countries'
import CountryInfo from './CountryInfo'

const App = () => {
    const [countries, setCountries] = useState([]);
    const [filterCountry, setFilterCountry] = useState('');

    const [showCountries, setShowCountries] = useState(false);

    useEffect(() => {
        axios.get("https://restcountries.eu/rest/v2/all")
            .then((response) => {
                setCountries(response.data);
            })
    }, []);

    const countriesToDisplay = showCountries ? countries.filter((country) => {
        return country.name.toLocaleLowerCase().includes(filterCountry.toLocaleLowerCase());
    })
        : [];

    const filterByName = (event) => {
        setFilterCountry(event.target.value);
        if (event.target.value === '') setShowCountries(false);
        else setShowCountries(true);
    }

    const showDetail = (selectedCountry) => {
        setFilterCountry(selectedCountry);
    }

    const renderNames = () => {
        if (countriesToDisplay.length > 10)
            return (
                <p>Please be more specific in your request</p>
            );
        else if (countriesToDisplay.length > 1)
            return countriesToDisplay.map((country) => {
                return (
                    <Country key={country.name} name={country.name} handler={() => showDetail(country.name)}/>
                );
            });
        else if (countriesToDisplay.length === 1) {
            return (
                <CountryInfo key={countriesToDisplay[0].name} country={countriesToDisplay[0]} />
            );
        }
    }
    return (
        <div>
            <h2>find a country</h2>
            <Filter value={filterCountry} handler={filterByName} />
            <Countries handler={renderNames()} />
        </div>
    )
}

export default App