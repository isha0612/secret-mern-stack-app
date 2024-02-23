import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInst } from "../utils/axios";
import { SecretCards } from "./SecretCards";
import { useUser } from "../Context";

function Secrets() {
    const { setIsAuthenticated } = useUser();
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                console.log("Trying to get data");
                const response = await axiosInst.get("/secrets");
                console.log(response);
                setData(response.data);
            }
            catch (err) {
                alert(err.message);
            }
        }
        getData();
    }, []);

    function handleLogout() {
        setIsAuthenticated(false);
        // document.cookie = "jwtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        localStorage.removeItem("jwtoken");
        navigate('/');
    }

    return (
        <div className="jumbotron text-center">
            <div className="container-fluid">
                <i className="fas fa-key fa-6x"></i>
                <h1 className="display-3">Anonymous Secrets!</h1>
                <hr />
                <button onClick={handleLogout} className="btn btn-light btn-lg mr-4">Log Out</button>
                <Link to="/submit">
                    <button className="btn btn-dark btn-lg">Submit a Secret</button>
                </Link>
                <br />
                {data === undefined || data.length === 0 ?
                    <div className="spinner-border" style={{"width": "6rem", "height": "6rem", "role":"status", "marginTop": "2rem"}}>
                        <span className="sr-only">Loading...</span>
                    </div>
                    : 
                    <div className="text-left ml-4">{data.map((d) => <SecretCards secret={d.secret} key={d._id} />)}</div>
                }
            </div>
        </div>
    );
}

export default Secrets;