import React, { useState } from "react";
import { axiosInst } from "../utils/axios.js";
import { useUser } from "../Context";
import { useNavigate, Link } from "react-router-dom";

function Login() {

    const navigate = useNavigate();
    const { setIsAuthenticated } = useUser();
    const [userDetails, setUserDetails] = useState({
        email: "",
        password: ""
    });
   
    function inputChange(e) {
        const { name, value } = e.target;
        setUserDetails(prevUserDetails => {
            return {
                ...prevUserDetails,
                [name]: value
            }
        });
    }

    async function handleForm(e) {
        e.preventDefault();
        console.log("Form is submitted");

        try {
            const data = await axiosInst.post("/login", userDetails);
            console.log(data);
            if (data.status === 201) {
                setIsAuthenticated(true);
                localStorage.setItem("jwtoken", data.data.jwtoken);
                navigate("/secrets");
            }
        }
        catch (err) {
            alert(err.message);
        }
    }

    return (
        <div className="container mt-5">
            <h1>Login</h1>
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
                                    value={userDetails.email} required />
                                </div>
                                <div className="form-group mb-4">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" onChange={inputChange}
                                    placeholder="Enter your password"
                                    className="form-control" name="password" id="password"
                                    value={userDetails.password} required />
                                </div>
                                <button type="submit" className="btn btn-dark mb-3">Login</button>
                                <br />
                                <Link to="/forgot-password" className="d-inline mr-4">Forgot Password?</Link>
                                <Link to="/register" className="d-inline mr-4">Don't have an account? Register here</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;