import { useState } from 'react'

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

