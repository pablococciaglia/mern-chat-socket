import { Navigate } from 'react-router-dom';
import AuthRouter from './AuthRouter';

const PublicRoutes = ({ isAuthenticated }) => {
	return !isAuthenticated ? <AuthRouter /> : <Navigate to='/' />;
};

export default PublicRoutes;
