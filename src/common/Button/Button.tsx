import React from "react";
import "./Button.css";

type ButtonProps = {
    buttonText: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    width?: string;
    height?: string;
    padding?: string;
    borderRadius?: string;
    className?: string;
};

const Button: React.FC<ButtonProps> = ({
    buttonText,
    onClick = () => {},
    type = "button",
    width = "14rem",
    height = "5rem",
    padding = "1.3rem 3.6rem",
    borderRadius = "0.4rem",
    className = "",
}) => {
    const style: React.CSSProperties = {
        width,
        height,
        padding,
        borderRadius,
        whiteSpace: "nowrap",
    };
    return (
        <button
            type={type}
            onClick={onClick}
            style={style}
            className={`button ${className}`}
            name={buttonText}
        >
            {buttonText}
        </button>
    );
};

export default Button;
