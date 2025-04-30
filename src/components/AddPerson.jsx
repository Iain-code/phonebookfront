const AddPerson = ({ numVal, nameVal, chgNum, chgName }) => {
    return (
    <div>
        <div>
            name: <input value={nameVal} onChange={chgName} />
        </div>
        <div>
            number: <input value={numVal} onChange={chgNum} />
        </div>
    </div>
)}

export default AddPerson