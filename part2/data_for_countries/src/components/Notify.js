const Notify = ({ temporaryCountries }) => {
  let notification = "";
  if (temporaryCountries.length > 10) {
    notification = "Too many matches, specify another filter";
  }
  return (
    <>
      <p>{notification}</p>
    </>
  );
};
export default Notify;
