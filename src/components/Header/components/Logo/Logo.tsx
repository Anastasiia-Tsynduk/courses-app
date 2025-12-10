import React from "react";
import logo from "../../../../assets/logo.svg";
import "./Logo.css";

const Logo: React.FC = () => {
    return (
        <div className="header_logo">
            <img src={logo} alt="Logo" />;{" "}
        </div>
    );
};

export default Logo;
