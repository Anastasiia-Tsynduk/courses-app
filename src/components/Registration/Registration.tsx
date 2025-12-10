import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthForm from "../AuthForm/AuthForm";

import { EMAIL_REQUIRED_ERROR } from "../../constants";

import "./Registration.css";

const Registration: React.FC = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<{
        name?: string;
        email?: string;
        password?: string;
        general?: string;
    }>({});
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: typeof errors = {};

        if (!name.trim()) newErrors.name = "Name is required";
        if (!email.trim()) newErrors.email = EMAIL_REQUIRED_ERROR;
        if (!password.trim()) newErrors.password = "Password is required";

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        const newUser = { name, email, password };

        const response = await fetch("http://localhost:4000/register", {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        if (response.ok) {
            setName("");
            setEmail("");
            setPassword("");
            setErrors({});
            navigate("/login");
        } else
            setErrors({
                general:
                    data.message || "Registration failed. Please try again.",
            });
    };
    return (
        <AuthForm
            title="Registration"
            fields={[
                {
                    label: "Name",
                    type: "text",
                    value: name,
                    placeholder: "Enter your name",
                    onChange: (e) => {
                        setName(e.target.value);
                        if (errors.name)
                            setErrors((previousErrors) => ({
                                ...previousErrors,
                                name: "",
                            }));
                    },
                    error: errors.name,
                },
                {
                    label: "Email",
                    type: "email",
                    value: email,
                    placeholder: "Enter your email",
                    onChange: (e) => {
                        setEmail(e.target.value);
                        if (errors.email)
                            setErrors((previousErrors) => ({
                                ...previousErrors,
                                email: "",
                            }));
                    },
                    error: errors.email,
                },
                {
                    label: "Password",
                    type: "password",
                    value: password,
                    placeholder: "Enter your password",
                    onChange: (e) => {
                        setPassword(e.target.value);
                        if (errors.password)
                            setErrors((previousErrors) => ({
                                ...previousErrors,
                                password: "",
                            }));
                    },
                    error: errors.password,
                },
            ]}
            buttonText="REGISTER"
            footerText="If you have an account you may"
            footerActionText={
                <Link to="/login" className="login">
                    Login
                </Link>
            }
            onSubmit={handleSubmit}
        />
    );
};

export default Registration;
