const Filter = ({ filterQuery, handleFilterChange }) => {
  return (
    <div>
      filter shown with{" "}
      <input value={filterQuery} onChange={handleFilterChange}></input>
    </div>
  );
};

export default Filter;
