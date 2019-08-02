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

    const [resourses, setResourses] = useState([]);

    let token = null;
    const setToken = (newToken) => {
        token = `bearer ${newToken}`;
    };

    const getAll = async () => {
        const response = await axios.get(baseUrl);
        setResourses(response.data);
        return response.data
    };

    const publish = async (resourse) => {
        console.log(baseUrl);
        const config = {
            headers: { Authorization: token }
        };
        const response = await axios.post(baseUrl, resourse, config);
        setResourses(resourses.concat(response.data));
        return response.data;
    };

    const putLike = async (newBlog, id) => {
        const response = await axios.put(`${baseUrl}/${id}`, newBlog);
        return response.data;
    };

    const service = {
        getAll,
        publish,
        putLike,
        setToken
    }

    return [
        resourses, service
    ]

}

