import { useState, useEffect } from "react";
import PersonForm from "./components/personForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import phoneBookServices from "./components/phoneBookServices";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [filterQuery, setFilterQuery] = useState("");
  const [errorNotification, setErrorNotification] = useState("");
  const [successNotification, setSuccessNotification] = useState("");

  useEffect(() => {
    console.log("effect");
    phoneBookServices.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleInputChange = {
    name: (event) => {
      setName(event.target.value);
    },
    number: (event) => {
      setNumber(event.target.value);
    },
    filter: (event) => {
      setFilterQuery(event.target.value);
    },
  };

  const resetNotification = () => {
    setTimeout(() => {
      setSuccessNotification("");
      setErrorNotification("");
    }, 5000);
  };

  const updatePerson = (person, personObject) => {
    if (
      window.confirm(
        `${person.name} is already added to phonebook, replace the old number with a new one?`
      )
    ) {
      phoneBookServices
        .update(person.id, personObject)
        .then((newPerson) => {
          const updatedPersons = [...persons];
          const index = updatedPersons.indexOf(person);
          updatedPersons[index] = { ...newPerson };
          setPersons(updatedPersons);
          const successMessage = `Updated ${name}`;
          setSuccessNotification(successMessage);
        })
        .catch((error) => {
          const errorMessage = `Information of ${name} has already been removed from the server`;
          setErrorNotification(errorMessage);
        });
    }
    resetNotification();
  };

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: name,
      number: number,
    };
    const handleContactUpdate = persons.every((person) => {
      if (person.name.toLowerCase() === name.toLowerCase()) {
        updatePerson(person, personObject);
        return false;
      }
      return true;
    });

    if (handleContactUpdate == true) {
      phoneBookServices
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
        })
        .catch((error) => {
          const errorMessage = `Adding ${name} failed. Please try again!`;
          setErrorNotification(errorMessage);
        });
    }
    const successMessage = `Added ${name}`;
    setSuccessNotification(successMessage);
    resetNotification();
  };

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      const newPersons = persons.filter((p) => p.id !== person.id);
      setPersons(newPersons);

      phoneBookServices.deleteFromSever(person.id).catch((error) => {
        const errorMessage = `Information of ${name} has already been removed from the server`;
        setErrorNotification(errorMessage);
      });
    }
    const successMessage = `Deleted ${person.name}`;
    setSuccessNotification(successMessage);
    resetNotification();
  };

  const handleNotificationRender = () => {
    if (errorNotification === "" && successNotification == "") {
      return <></>;
    } else {
      return (
        <Notification
          successNotification={successNotification}
          errorNotification={errorNotification}
        />
      );
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {handleNotificationRender()}
      <Filter
        filterQuery={filterQuery}
        handleFilterChange={handleInputChange.filter}
      />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        name={name}
        handleNameChange={handleInputChange.name}
        handleNumberChange={handleInputChange.number}
        number={number}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filterQuery={filterQuery}
        handleDelete={deletePerson}
      />
    </div>
  );
};

export default App;
