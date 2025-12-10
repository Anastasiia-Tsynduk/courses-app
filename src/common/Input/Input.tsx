import React from "react";
import "./Input.css";

type InputProps = {
    labelText: string;
    placeholderText: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string | number;
    type?: string;
    errorMessage?: string;
    className?: string;

    variant?: "default" | "auth" | "small";
};

const Input: React.FC<InputProps> = ({
    labelText,
    onChange = () => {},
    placeholderText = "",
    value,
    type = "text",
    errorMessage = "",
    className = "",
    variant = "default",
}) => {
    const id = labelText.toLowerCase().replace(/\s+/g, "-");

    const variantMap = {
        auth: "input-auth",
        default: "input-default",
        small: "input-small",
    };

    const classVariant = variantMap[variant] || "";

    return (
        <div
            className={`input-container ${
                errorMessage ? "has-error" : ""
            } ${classVariant} ${className}`}
        >
            <label htmlFor={id}>{labelText}</label>
            <input
                value={value}
                placeholder={placeholderText}
                onChange={onChange}
                id={id}
                type={type}
            />
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    );
};

export default Input;
