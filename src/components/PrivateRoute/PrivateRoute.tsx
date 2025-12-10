import { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute: FC<{ children: React.ReactNode }> = ({ children }) => {
    const token = localStorage.getItem("token");
    const location = useLocation();
    const path = location.pathname;

    if (token) {
        if (path.startsWith("/courses")) {
            return children;
        } else {
            return <Navigate to="/courses" replace />;
        }
    } else {
        if (path.startsWith("/courses") || path === "/") {
            return <Navigate to="/login" replace />;
        } else {
            return children;
        }
    }
};

export default PrivateRoute;
