import React, {useEffect, useState, useMemo} from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {axiosInst} from "../utils/axios.js";
import { useUser } from "../Context/index.js";

function useQuery() {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
}

function ResetPassword() {
    const navigate = useNavigate();
    const query = useQuery();
    const {setIsAuthenticated} = useUser();
    console.log(query.get("jwtoken"));
    useEffect(() => {
        const jwtoken = query.get("jwtoken");
        if(jwtoken) {
            localStorage.setItem("jwtoken", jwtoken);
            setIsAuthenticated(true);
        }
    }, [query, setIsAuthenticated]);
    const { id } = useParams();
    let [userDetails, setUserDetails] = useState({
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
                    password1: "", 
                    password2: ""
                }
            });
            return;
        }
        console.log("Form is submitted");
        try {
            const data = await axiosInst.post(`/reset-password/${id}`, userDetails);
            console.log(data);
            if(data.status === 201) {
                navigate("/login");
            }
        }
        catch(err) {
            alert(err.message);
        }
    }

    return (
        <div className="container mt-5">
            <h1>Reset Password</h1>
            <br />
            <div className="row">
                <div className="col-sm-8">
                    <div className="card">
                        <div className="card-body">
                            <form action="/" method="POST" onSubmit={handleForm}>
                                <div className="form-group">
                                    <label htmlFor="password1">Password</label>
                                    <input type="password" onChange={inputChange} 
                                    placeholder="Enter your new password"
                                    className="form-control" name="password1" id="password1" 
                                    value={userDetails.password1} required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password2">Confirm Password</label>
                                    <input type="password" onChange={inputChange} 
                                    placeholder="Enter your new password again"
                                    className="form-control" name="password2" id="password2" 
                                    value={userDetails.password2} required/>
                                </div>
                                <button type="submit" className="btn btn-dark mt-2">Update Password</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;