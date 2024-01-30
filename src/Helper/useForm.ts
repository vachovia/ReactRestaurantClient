import { useState } from 'react';

const useForm = <T extends object>(userInput: T) => {
    // type Errors = { [k in keyof T]: T[k] }
    type Errors = {
        [k in keyof T]?: string
    }
    // type Errors = {
            // [k in "email", "password",...]: string
            // "email": string
            // "password": string
            // ...
    // }
    
    const [values, setValues] = useState(userInput);
    const [errors, setErrors] = useState<Errors>({});

    const handleInputChange = (name: keyof T) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { value } = e.target;
        setValues({...values, [name]: value });
    }

    return {
        values, setValues,
        errors, setErrors,
        handleInputChange
    }
}

export default useForm;