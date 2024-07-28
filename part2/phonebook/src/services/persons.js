import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then((response) => response.data);
}


const postNewPerson = (newPerson) => {
    const request = axios.post(baseUrl, newPerson);
    return request.then((response) => response.data);
}

const updatePersonNumber = (personChanged) => {
    const request = axios.put(`${baseUrl}/${personChanged.id}`, personChanged);
    return request.then((response) => response.data);
}

const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then((response) => response.data);
}

export { getAll, postNewPerson, deletePerson, updatePersonNumber }
