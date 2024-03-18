import React, { useState } from "react";
import { axiosInst } from "../utils/axios.js";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ForgotPassword() {
    const [email, setEmail] = useState('');

    function inputChange(e) {
        const { value } = e.target;
        setEmail(value);
    }

    async function handleForm(e) {
        e.preventDefault();
        if (email === "") {
            toast("Email field cannot be empty", { type: "warning", autoClose: 1000 });
            return;
        }
        try {
            const data = await axiosInst.post("/forgot-password", { email });
            if (data.status === 201) {
                toast("Kindly check the email where a password reset link has been sent.", { type: "success", autoClose: 1000 });
            }
        }
        catch (err) {
            toast(err.response.data.error, { type: "error", autoClose: 1000 });
        }
    }

    return (
        <div className="container mt-5">
            <h1 className="h1-responsive text-left">Forgot Password</h1>
            <br />
            <div className="row">
                <div className="col-sm-8">
                    <div className="card">
                        <div className="card-body">
                            <form action="/" method="POST" onSubmit={handleForm}>
                                <div className="form-group mb-4">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" onChange={inputChange}
                                        placeholder="Enter your email"
                                        className="form-control" name="email" id="email"
                                        value={email} />
                                </div>
                                <button type="submit" className="btn btn-dark mb-4">Send</button>
                                <br />
                                <Link to="/register" className="d-inline mr-4 mb-2">Don't have an account? Register here</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default ForgotPassword;