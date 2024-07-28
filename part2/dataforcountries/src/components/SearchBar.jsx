const SearchBar = ({ country, setCountry }) => {

    return (
        <div>
            find countries <input value={country} onChange={(e) => setCountry(e.target.value)}/>
        </div>
    )
}

export default SearchBar;