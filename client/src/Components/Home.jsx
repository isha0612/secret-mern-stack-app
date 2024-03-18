import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="jumbotron centered">
            <div className="container">
                <i className="fas fa-key fa-6x">
                    <h1 className="h1-responsive text-center">Secrets</h1>
                </i>
                <p className="lead">Don't keep your secrets, share them anonymously!</p>
                <hr />
                <Link to='/register'>
                    <button className="btn btn-light btn-lg mr-4">Register</button>
                </Link>
                <Link to='/login'>
                    <button className="btn btn-dark btn-lg">Login</button>
                </Link>
            </div>
        </div>
    );
}

export default Home;