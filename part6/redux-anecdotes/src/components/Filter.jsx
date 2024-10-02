import { useDispatch } from "react-redux"
import { filterChange } from "../reducers/filterReducer"

const Filter = () => {

    let dispatch = useDispatch()

    
    const handleChange = (event) => {
      let value = event.target.value
    
      if(value.trim() === '') {
        dispatch(filterChange('ALL'))
        return
      }

      dispatch(filterChange(value))
    }
    
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }
  
  export default Filter