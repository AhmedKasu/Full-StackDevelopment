import { useState, useEffect } from "react";
import SimilarSearchQuery from "./components/SimilarSearchQuery";
import CountryDetails from "./components/CountryDetails";
import Notify from "./components/Notify";
import axios from "axios";
import WeatherDetails from "./components/WeatherDetails";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [temporaryCountries, setTemporaryCountries] = useState([]);
  const [filterQuery, setFilterQuery] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [weatherSearchQuery, setWeatherSearchQuery] = useState("");

  useEffect(() => {
    console.log("effect1");
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      console.log("promise fulfilled1");
      setCountries(response.data);
    });
  }, []);

  const handleTemporaryCountries = () => {
    let tempcountries = [];
    countries.forEach((country) => {
      if (filterQuery === "") {
        return;
      } else if (
        country.name.official.toLowerCase().includes(filterQuery.toLowerCase())
      ) {
        tempcountries.push(country);
        setTemporaryCountries(tempcountries);
      }
    });
  };
  useEffect(() => {
    handleTemporaryCountries();
  }, [filterQuery]);

  const api_key = process.env.REACT_APP_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${weatherSearchQuery}&units=metric&appid=${api_key}`;

  useEffect(() => {
    if (temporaryCountries.length === 1) {
      setWeatherSearchQuery(temporaryCountries[0].capital[0]);
    }
  }, [temporaryCountries.length]);

  useEffect(() => {
    console.log("effect2");
    if (weatherSearchQuery.length > 1) {
      axios.get(url).then((response) => {
        console.log("promise fulfilled");
        setWeatherData(response.data);
      });
    }
  }, [weatherSearchQuery]);

  const handleFilter = (e) => {
    setFilterQuery(e.target.value);
  };

  const filteredCountries =
    temporaryCountries.length === 1 ? (
      <CountryDetails temporaryCountries={temporaryCountries} />
    ) : (
      <SimilarSearchQuery temporaryCountries={temporaryCountries} />
    );

  const weatherDetails =
    temporaryCountries.length === 1 && Object.keys(weatherData).length > 1 ? (
      <WeatherDetails
        weatherData={weatherData}
        weatherSearchQuery={weatherSearchQuery}
      />
    ) : (
      <></>
    );

  return (
    <div>
      find countries
      <input value={filterQuery} onChange={handleFilter}></input>
      <Notify temporaryCountries={temporaryCountries} />
      {filteredCountries}
      {weatherDetails}
    </div>
  );
};

export default App;
