import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Button from "../../common/Button/Button";
import Logo from "./components/Logo/Logo";

import { logout } from "../../store/user/userSlice";
import { RootState } from "../../store";

import "./Header.css";

const Header: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.user);
    const token = user.token;

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch(logout());
        navigate("/login");
    };

    const handleLogin = () => {
        navigate("/login");
    };
    return (
        <header>
            <Logo />
            {token ? (
                <div className="user-panel">
                    {user && <span className="user-name">{user.name}</span>}

                    <Button buttonText="LOGOUT" onClick={handleLogout} />
                </div>
            ) : (
                <Button buttonText="LOGIN" onClick={handleLogin} />
            )}
        </header>
    );
};

export default Header;
