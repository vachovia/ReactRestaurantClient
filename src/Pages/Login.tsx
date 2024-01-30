import { useState } from "react";
import { authResponse, userLoginModel, userModel } from "./../Interfaces";
import { useLoginUserMutation } from "./../Apis/authApi";
import { toastNotify, useForm } from "./../Helper";
import { useNavigate } from "react-router-dom";
import { InvalidInput, MainLoader } from "./../Components/Page/Common";
import { useDispatch } from "react-redux";
import jwt_decode from 'jwt-decode';
import { setLoggedInUser } from "./../Storage/Redux/userAuthSlice";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const userInput: userLoginModel = { email: "", password: "" };
    const { values, errors, setErrors, handleInputChange } = useForm(userInput);
    const [ loginUser ] = useLoginUserMutation();

    const validate = () => {
        let temp: typeof errors = {};
        const isEmailValid = (/\S+@\S+\.\S+/).test((values.email || "").trim());        
        temp.email = isEmailValid ? "" : "Email is not valid.";
        temp.password = (values.password || "").trim() !== "" ? "" : "Please fill out this field.";

        setErrors(temp);
        
        return Object.values(temp).every(x => x === "");
    }

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const isFormValid = validate();
        
        if (isFormValid){
            try {
                const response: authResponse = await loginUser(values).unwrap();

                const {fullName, email, role, uid }: userModel = jwt_decode(response.token);

                dispatch(setLoggedInUser({fullName, email, role, uid}));

                localStorage.setItem("token", response.token);

                navigate("/");
            } catch(e: any)  {
                console.log(e);
                toastNotify("Username or password is incorrect", 'error');
            }     
        }

        setLoading(false);
    }

    return (
        <div className="container text-center">
            {loading && <MainLoader />}
            <form onSubmit={handleSubmit} noValidate>
                <h1 className="mt-5">Login</h1>
                <div className="mt-5">
                    <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
                        <input type="text" name="email" className="form-control" placeholder="Enter Email" value={values.email} onChange={handleInputChange('email')} required />
                        { errors.email && (<InvalidInput message={errors.email}/>) }
                    </div>
                    <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
                        <input type="password" name="password" className="form-control" placeholder="Enter Password" value={values.password} onChange={handleInputChange('password')} required />
                        { errors.password && (<InvalidInput message={errors.password}/>) }
                    </div>
                </div>

                <div className="mt-2">
                    <button type="submit" className="btn btn-success" style={{ width: "200px" }}>Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login;