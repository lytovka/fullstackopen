import { useState } from 'react';
import axios from "axios";


export const useFieldChange = () => {
    const [value, setValue] = useState("");

    const onChange = (event) => {
        setValue(event.target.value);
    }

    const setToDefault = () => {
        setValue("");
    }

    return {
        value,
        onChange,
        setToDefault
    }
}

export const useResourse = (baseUrl) => {
    let token = null;

    const setToken = (newToken) => {
        token = `bearer ${newToken}`;
    };

    const [resourses, setResourses] = useState([]);

    const getAll = () => {
        const request = axios.get(baseUrl);
        return request.then(response => response.data);
    };

    const publish = async (resourse) => {
        const config = {
            headers: { Authorization: token }
        };
        const response = await axios.post(baseUrl, resourse, config);
        return response.data;
    };

    const putLike = async (newBlog, id) => {
        const response = await axios.put(`${baseUrl}/${id}`, newBlog);
        return response.data;
    };

    return {
        resourses, getAll, publish, putLike, setToken
    }

}

