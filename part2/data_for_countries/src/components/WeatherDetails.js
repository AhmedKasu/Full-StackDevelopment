const WeatherDetails = ({ weatherData, weatherSearchQuery }) => {
  const { icon } = weatherData.weather[0];
  const temperature = weatherData.main.temp;
  const iconUrl = ` http://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <>
      <h2>Weather in {weatherSearchQuery}</h2>
      <p>temperature {temperature} Celcius</p>
      <div>
        <img src={iconUrl}></img>
      </div>
    </>
  );
};

export default WeatherDetails;
