import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import AuthForm from "../AuthForm/AuthForm";

import { EMAIL_REQUIRED_ERROR } from "../../constants";
import { login } from "../../store/user/userSlice";

import "./Login.css";

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<{
        email?: string;
        password?: string;
        general?: string;
    }>({});
    const dispatch = useDispatch();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: typeof errors = {};

        if (!email.trim()) newErrors.email = EMAIL_REQUIRED_ERROR;
        if (!password.trim()) newErrors.password = "Password is required";

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        const newUser = { email, password };

        const response = await fetch("http://localhost:4000/login", {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        if (response.ok) {
            dispatch(
                login({
                    name: data.user.name,
                    email: data.user.email,
                    token: data.result,
                })
            );

            localStorage.setItem(
                "user",
                JSON.stringify({ name: data.user.name, email: data.user.email })
            );
            localStorage.setItem("token", data.result);

            setEmail("");
            setPassword("");
            setErrors({});
            navigate("/courses");
        } else
            setErrors({
                general: data.message || "Login failed. Please try again.",
            });
    };
    return (
        <AuthForm
            title="Login"
            fields={[
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
            buttonText="LOGIN"
            footerText=" If you don't have an account you may"
            footerActionText={
                <Link to="/registration" className="registration">
                    Registration
                </Link>
            }
            onSubmit={handleSubmit}
            showFooterOnNewLine
        />
    );
};

export default Login;
