const Persons = ({ persons, filterQuery, handleDelete }) => {
  const filteredPersons = persons.filter((person) => {
    if (filterQuery === "") {
      return person;
    } else if (person.name.toLowerCase().includes(filterQuery.toLowerCase())) {
      return person;
    }
  });

  return (
    <>
      {filteredPersons.map((person, i) => {
        return (
          <p key={i + 1}>
            {" "}
            {person.name} {person.number}{" "}
            <button onClick={() => handleDelete(person)}>delete</button>
          </p>
        );
      })}
    </>
  );
};

export default Persons;
