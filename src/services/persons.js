import axios from "axios"

const baseUrl = "https://phonebookbe-1.onrender.com/api/persons";

const getAll = () => {
    console.log(`Calling API at: ${baseUrl}`);
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (newObject) => {
    const request = axios.post(`${baseUrl}`, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    console.log("Starting update")
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

const del = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

export default {getAll, create, update, del}