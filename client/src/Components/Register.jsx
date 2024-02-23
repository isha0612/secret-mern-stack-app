import React, {useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import {axiosInst} from "../utils/axios.js";
import { useUser } from "../Context/";

function Register() {
    const navigate = useNavigate();
    const {setIsAuthenticated} = useUser();
    let [userDetails, setUserDetails] = useState({
        email: "",
        password1: "",
        password2: ""
    });

    function inputChange(e) {
        const {name, value} = e.target;
        setUserDetails(prevUserDetails => {
            return {
                ...prevUserDetails,
                [name]: value
            }
        });
    }

    async function handleForm(e) {
        e.preventDefault();
        if(userDetails.password1 !== userDetails.password2) {
            alert("Passwords do not match");
            setUserDetails(() => {
                return {
                    email: "", 
                    password1: "", 
                    password2: ""
                }
            });
            return;
        }
        console.log("Form is submitted");
        try {
            const data = await axiosInst.post("/register", userDetails);
            console.log(data);
            if(data.status === 201) {
                setIsAuthenticated(true);
                localStorage.setItem("jwtoken", data.data.jwtoken);
                navigate("/secrets");
            }
        }
        catch(err) {
            alert(err.message);
        }
    }

    return (
        <div className="container mt-5">
            <h1>Register</h1>
            <br />
            <div className="row">
                <div className="col-sm-8">
                    <div className="card">
                        <div className="card-body">
                            <form action="/" method="POST" onSubmit={handleForm}>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" onChange={inputChange} 
                                    placeholder="Enter your email"
                                    className="form-control" name="email" id="email" 
                                    value={userDetails.email} required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password1">Password</label>
                                    <input type="password" onChange={inputChange} 
                                    placeholder="Enter your password"
                                    className="form-control" name="password1" id="password1" 
                                    value={userDetails.password1} required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password2">Confirm Password</label>
                                    <input type="password" onChange={inputChange} 
                                    placeholder="Enter your password again"
                                    className="form-control" name="password2" id="password2" 
                                    value={userDetails.password2} required/>
                                </div>
                                <button type="submit" className="btn btn-dark">Register</button>
                                <Link to="/login"><p className="mt-3 mb-3">Already have an account? Login here</p></Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;