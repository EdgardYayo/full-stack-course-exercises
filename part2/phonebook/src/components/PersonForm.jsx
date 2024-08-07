const PersonForm = ({ handleSubmit, newName, setNewName, setNewNumber, newNumber }) => {
    return (
        <form onSubmit={handleSubmit}>
        <div>
          name: <input name='newName' value={newName} onChange={(e) => setNewName(e.target.value)}/>
        </div>
        <div>
          number: <input name='newNumber' value={newNumber} onChange={(e) => setNewNumber(e.target.value)}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm;