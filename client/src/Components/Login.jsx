import React, { useState } from "react";
import { axiosInst } from "../utils/axios.js";
import { useUser } from "../Context";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        if(userDetails.email === "" || userDetails.password === "") {
            toast("Email or Password fields cannot be empty", { type: "warning", autoClose: 1000 });
            return;
        }

        try {
            const data = await axiosInst.post("/login", userDetails);
            if (data.status === 201) {
                setIsAuthenticated(true);
                localStorage.setItem("jwtoken", data.data.jwtoken);
                toast(data.data.message, {
                    type: "success", autoClose: 1000, onClose: () => {
                        navigate("/secrets");
                    }
                });
            }
        }
        catch (err) {
            toast(err.response.data.error, { type: "error", autoClose: 1000 });
            setUserDetails(() => {
                return {
                    email: "",
                    password: ""
                }
            });
        }
    }

    return (
        <div className="container mt-5">
            <h1 className="h1-responsive text-left">Login</h1>
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
                                        value={userDetails.email} />
                                </div>
                                <div className="form-group mb-4">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" onChange={inputChange}
                                        placeholder="Enter your password"
                                        className="form-control" name="password" id="password"
                                        value={userDetails.password} />
                                </div>
                                <button type="submit" className="btn btn-dark mb-3">Login</button>
                                <br />
                                <div class="container-fluid pl-0">
                                    <div class="row">
                                        <div class="col-lg-6 col-md-12">
                                            <Link to="/forgot-password" className="d-inline mr-4">Forgot Password?</Link>
                                        </div>
                                        <div class="col-lg-6 col-md-12">
                                            <Link to="/register" className="d-block mr-4">Don't have an account? Register here</Link>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Login;