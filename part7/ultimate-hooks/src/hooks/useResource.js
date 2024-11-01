import { useEffect, useState } from 'react';
import axios from 'axios';

const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])


    const getAll = async () => {
        let response = await axios.get(baseUrl);
        setResources(response.data);
    }

    const create = async (resource) => {
        let response = await axios.post(baseUrl, resource);
        setResources([...resources, response.data])
    }

    useEffect(() => {
        getAll()
    }, [])

    const service = {
        create,
        getAll
    }

    return [resources, service]
}

export default useResource