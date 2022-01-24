import { Navigate } from 'react-router-dom';
import ChatPage from '../pages/ChatPage';

const PrivateRoutes = ({ isAuthenticated }) => {
	return isAuthenticated ? <ChatPage /> : <Navigate to='/auth/login' />;
};

export default PrivateRoutes;
