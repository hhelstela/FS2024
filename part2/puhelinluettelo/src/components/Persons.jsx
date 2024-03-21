const Persons = (props) => {
    return (
      <ul>
        {props.toShow.map(person =>
          <li key={person.name}>{person.name} {person.number}</li>
          )}
      </ul>
    )
  }

  export default Persons