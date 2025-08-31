// src/pages/AuthSuccess.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthSuccess = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        const name = params.get("name");
        const email = params.get("email");
        const id = params.get("id");

        if (token) {
            localStorage.setItem("token", token); // save token
            localStorage.setItem("user", JSON.stringify({ name: name, email: email, _id: id })); // save token
            navigate("/"); // redirect to dashboard
        } else {
            navigate("/login");
        }
    }, [navigate]);

    return <h1>Logging you in...</h1>;
};

export default AuthSuccess;
