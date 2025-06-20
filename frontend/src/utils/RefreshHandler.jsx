import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSession } from '../context/SessionContext';

function RefreshHandler({ setIsAuthenticated }) {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, loading } = useSession();

    useEffect(() => {
        if (!loading) {
            if (user) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        }
    }, [user, loading, setIsAuthenticated]);


    useEffect(() => {
        const data = localStorage.getItem('user-info');
        const token = JSON.parse(data)?.token;
        
        if (token) {
            setIsAuthenticated(true);
            if (location.pathname === '/auth') {
                const targetPath = location.state?.from || '/home';
                navigate(targetPath, { replace: true });
            }
        } else {
            setIsAuthenticated(false);
            if (location.pathname !== '/' && location.pathname !== '/auth') {
                navigate('/auth', { replace: true, state: { from: location.pathname } });
            }
        }
    }, [location.pathname, navigate, setIsAuthenticated]);

    return null;
}

export default RefreshHandler;