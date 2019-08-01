import { useState } from 'react'

export const useFieldChange = () => {
    const [value, setValue] = useState("");

    const onChange = (event) => {
        setValue(event.target.value);
    }

    return {
        value,
        onChange
    }
}

