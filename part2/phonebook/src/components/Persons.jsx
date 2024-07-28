const Persons = ({ filterNames }) => {
    return (
        <div>
            {filterNames()}
        </div>
    )
}

export default Persons;