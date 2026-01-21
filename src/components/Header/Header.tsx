import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Button from "../../common/Button/Button";
import Logo from "./components/Logo/Logo";

import { logoutAsync } from "../../store/user/userSlice";
import { AppDispatch, RootState } from "../../store";

import "./Header.css";

const Header: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.user);
    const token = user.token;

    const handleLogout = () => {
        dispatch(logoutAsync());
        localStorage.removeItem("token");
        localStorage.removeItem("user");
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
