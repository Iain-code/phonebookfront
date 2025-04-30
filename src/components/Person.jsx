
const Person = ({person, onDelete}) => {
    const handleDelete = (event) => {
        event.preventDefault()
        if (window.confirm(`Delete ${person.name}`) === true) {
        onDelete(person.id)
        } else {
            return
        }
    }
    return ( 
        <li>
            {person.name} {person.number}
            <button type="button" onClick={handleDelete}> Delete</button>
        </li>
)}

export default Person