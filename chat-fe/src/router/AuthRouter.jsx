import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import '../css/login-register.css';

const AuthRouter = () => {
	return (
		<div className='limiter'>
			<div className='container-login100'>
				<div className='wrap-login100 p-t-50 p-b-90'>
					<Routes>
						<Route path='/Login' element={<LoginPage />} />
						<Route path='/Register' element={<RegisterPage />} />
						<Route path='*' element={<LoginPage />} />
					</Routes>
				</div>
			</div>
		</div>
	);
};

export default AuthRouter;
