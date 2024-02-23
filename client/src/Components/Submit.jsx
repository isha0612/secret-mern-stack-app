import React, {useState} from "react";
import { axiosInst } from "../utils/axios";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../Context";

function Submit() {
    const {setIsAuthenticated} = useUser();
    const navigate = useNavigate();
    const [secret, setSecret] = useState("");

    function inputChange(e) {
        const {value} = e.target;
        setSecret(value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        console.log("Form is submitted");

        try {
            const data = await axiosInst.post("/secrets", {secret});
            console.log(data);
            if (data.status === 201) {
                setIsAuthenticated(true);
                navigate("/secrets");
            }

        } catch(err) {
            alert(err.message);
        }
    }

    return (
        <div className="container">
            <div>
                <h1 className="display-3 text-center mt-5">Secrets</h1>
                <i className="fas fa-key fa-6x">
                    <p className="secret-text mt-4">
                    Don't keep your secrets, share them anonymously!
                    </p>
                </i>
                <form onSubmit={handleSubmit} action="/" method="POST">
                    <div className="mb-3 mt-5 text-center">
                        <textarea name="secret" className="form-control" rows="3" cols="20" style={{"resize": "none", "width": "40%", "height": "auto", "margin": "auto"}}
                        placeholder="Enter your secret" value={secret} onChange={inputChange} required/>
                        <br/>
                        <Link to='/secrets'>
                            <button className="btn btn-light btn-lg mr-4">Secrets Page</button>
                        </Link>
                        <button type="submit" className="btn btn-dark btn-lg">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Submit;