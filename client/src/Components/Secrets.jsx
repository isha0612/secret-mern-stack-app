import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInst } from "../utils/axios";
import { SecretCards } from "./SecretCards";
import { useUser } from "../Context";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Secrets() {
    const { setIsAuthenticated } = useUser();
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axiosInst.get("/secrets");
                if (response.status === 200 || response.status === 201) {
                    setData(response.data);
                }
            }
            catch (err) {
                toast(err.response.data.error, { type: "error", autoClose: 1000 });
            }
        }
        getData();
    }, []);

    function handleLogout() {
        localStorage.removeItem("jwtoken");
        toast("User successfully Logged Out", {
            type: "success", autoClose: 1000, onClose: () => {
                setIsAuthenticated(false);
                navigate("/");
            }
        });
    }

    return (
        <div className="jumbotron text-center">
            <div className="container-fluid">
                <div class="m-4 d-flex flex-row align-items-center justify-content-end">
                    <i className="fas fa-key fa-6x mr-auto ml-auto">
                        <h1 className="h1-responsive text-center">Anonymous Secrets!</h1>
                    </i>
                    <div class="dropdown">
                        <img src={require("../images/profile.png")} alt="Avatar" class="avatar dropdown-toggle img-fluid" data-bs-toggle="dropdown" style={{ "cursor": "pointer" }} />
                        <div className="dropdown-menu bg-dark text-light pl-2 pt-2 pb-2 pr-2">
                            <li className="m-2"><Link to="/submit" style={{ "color": "inherit", "textDecoration": "none" }}>Submit a Secret</Link></li>
                            <li className="m-2" onClick={handleLogout} style={{ "cursor": "pointer" }}>Log Out</li>
                        </div>
                    </div>
                </div>

                <hr />
                {data === undefined || data.length === 0 ?
                    <div className="spinner-border" style={{ "width": "6rem", "height": "6rem", "role": "status", "marginTop": "2rem" }}>
                        <span className="sr-only">Loading...</span>
                    </div>
                    :
                    <div className="text-left ml-4">{data.map((d) => <SecretCards secret={d.secret} key={d._id} />)}</div>
                }
            </div>
            <ToastContainer />
        </div >
    );
}

export default Secrets;