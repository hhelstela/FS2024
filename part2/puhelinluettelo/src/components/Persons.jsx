const Persons = (props) => {
    return (
      <ul>
        {props.toShow.map(person =>
        <div key={person.name}>
          <li key={person.name}>{person.name} {person.number}</li> 
          <button key={person.number} onClick={() => props.handleDelete(person)} >delete</button>
        </div>
          )}
      </ul>
    )
  }

  export default Persons