import { useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import LoadingPage from '../pages/LoadingPage';
import PageNotFound from '../pages/PageNotFound';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';

const AppRouter = () => {
	const { auth, verifyToken } = useContext(AuthContext);

	useEffect(() => {
		verifyToken();
	}, [verifyToken]);

	if (auth.checking) {
		return <LoadingPage speed={5} customText={'Loading'} />;
	}

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path='/auth/*'
					element={<PublicRoutes isAuthenticated={auth.logged} />}
				/>
				<Route
					path='/'
					element={<PrivateRoutes isAuthenticated={auth.logged} />}
				/>
				<Route path='*' element={<PageNotFound />} />
			</Routes>
		</BrowserRouter>
	);
};

export default AppRouter;
