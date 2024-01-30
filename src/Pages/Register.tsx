import React, { useState, useRef } from "react";
import { SD_Roles } from "./../Interfaces/enums";
import { useForm } from "./../Helper";
import { useRegisterUserMutation } from "./../Apis/authApi";
import { userRegisterModel } from "../Interfaces";
import { InvalidInput, MainLoader } from "../Components/Page/Common";
import { useNavigate } from "react-router-dom";
import { toastNotify } from "./../Helper"; 

const Register = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const userInput: userRegisterModel = {
        email: "", name: "",
        password: "", role: ""        
    }; 

    const { values, setValues, errors,
            setErrors, handleInputChange
    } = useForm(userInput);

    const validate = () => {
        let temp: typeof errors = {};
        const isEmailValid = (/\S+@\S+\.\S+/).test((values.email || "").trim());
        
        temp.email = isEmailValid ? "" : "Email is not valid.";
        temp.name = (values.name || "").trim() !== "" ? "" : "Please fill out this field.";
        temp.password = (values.password || "").trim() !== "" ? "" : "Please fill out this field.";
        temp.role = (values.role || "").trim() !== "" ? "" : "Please fill out this field.";

        setErrors(temp);
        
        return Object.values(temp).every(x => x === "");
    }

    const [registerUser, { error }] = useRegisterUserMutation();

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const isFormValid = validate();
        
        if(isFormValid){
            try {
                await registerUser(values).unwrap();
                toastNotify("Registration successful! Please login to continue.");
                navigate("/login");
            } catch (e: any){
                console.log(e);
                toastNotify(e.message, 'error');
            }
            
        } else {
            // formRef.current?.checkValidity(); // formRef.current?.reportValidity();                        
        }
        setLoading(false);
    }

    return (
        <div className="container text-center">
            {loading && <MainLoader />}
            <form onSubmit={handleSubmit} ref={formRef} noValidate>
                <h1 className="mt-5">Register</h1>
                <div className="mt-5">
                    <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
                        <input type="text" name="email" className="form-control" placeholder="Enter Email" value={values.email} onChange={handleInputChange('email')} required />
                        { errors.email && (<InvalidInput message={errors.email}/>) }
                    </div>
                    <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
                        <input type="text" name="name" className="form-control" placeholder="Enter Name" value={values.name} onChange={handleInputChange('name')} required />
                        { errors.name && (<InvalidInput message={errors.name}/>) }
                    </div>
                    <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
                        <input type="password" name="password" className="form-control" placeholder="Enter Password" value={values.password} onChange={handleInputChange('password')} required />
                        { errors.password && (<InvalidInput message={errors.password}/>) }
                    </div>
                    <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
                        <select className="form-control form-select" name="role" value={values.role} onChange={handleInputChange('role')} required>
                            <option value="">--Select Role--</option>
                            <option value={`${SD_Roles.USER}`}>User</option>
                            <option value={`${SD_Roles.ADMIN}`}>Admin</option>
                        </select>
                        { errors.role && (<InvalidInput message={errors.role}/>) }
                    </div>
                </div>
                <div className="mt-5">
                    <button type="submit" className="btn btn-success" disabled={loading}>Register</button>
                </div>
            </form>
        </div>
    )
}

export default Register;