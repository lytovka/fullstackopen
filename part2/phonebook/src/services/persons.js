import axios from 'axios'

const baseURL = "/api/persons";

const getAll = () => {
    return axios.get(baseURL).then((response) => {
        return response.data;
    });
}

const create = (newObj) => {
    return axios.post(baseURL, newObj).then((response) => {
        return response.data;
    });
}

const update = (id,obj) => {
    return axios.put(`${baseURL}/${id}`, obj).then((response) => {
        return response.data;
    })
}

const remove = (id) => {
    return axios.delete(`${baseURL}/${id}`);
}

export default {getAll, create, update, remove}