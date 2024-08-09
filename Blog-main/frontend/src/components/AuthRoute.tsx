import { Navigate, useLocation } from 'react-router-dom';

interface AuthRouteProps {
    children: JSX.Element;
}

const AuthRoute = ({ children }) => {
    const location = useLocation();
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }

    return children;
};

export default AuthRoute;
