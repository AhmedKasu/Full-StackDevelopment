const SimilarSearchQuery = ({ temporaryCountries }) => {
  const countries = [];
  if (temporaryCountries.length > 1 && temporaryCountries.length < 11) {
    temporaryCountries.map((c) => {
      countries.push(c);
      //console.log(countries);
    });
  }
  return (
    <div>
      {countries.map((country, i) => {
        return <p key={i + 1}>{country.name.common}</p>;
      })}
    </div>
  );
};

export default SimilarSearchQuery;
