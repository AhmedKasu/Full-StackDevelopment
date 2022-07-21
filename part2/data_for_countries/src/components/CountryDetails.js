const CountryDetails = ({ temporaryCountries }) => {
  const handleCountryDetails = () => {
    let country = "";
    if (temporaryCountries.length === 1) {
      country = temporaryCountries;
    }
    return country;
  };

  const handleLanguages = () => {
    const languages = [];
    for (let key in country[0].languages) {
      languages.push(country[0].languages[key]);
    }
    return languages;
  };

  const handleFlags = () => {
    const flags = [];
    let flag = "";
    for (let key in country[0].flags) {
      flags.push(country[0].flags[key]);
    }
    return (flag = flags[0]);
  };

  const country = handleCountryDetails();
  return (
    <div>
      <h1>{country[0].name.common}</h1>
      <p>capital {country[0].capital[0]}</p>
      <p>area {country[0].area}</p>
      <h2>languages:</h2>
      {handleLanguages().map((language, i) => {
        return <li key={i + 1}>{language}</li>;
      })}{" "}
      <div style={{ marginTop: "10px" }}>
        <img src={handleFlags()}></img>
      </div>
    </div>
  );
};
export default CountryDetails;
