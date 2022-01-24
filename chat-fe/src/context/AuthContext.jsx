import { createContext, useCallback, useContext, useState } from 'react';
import { fetchWOToken, fetchWToken } from '../helpers/fetchRequest';
import types from '../types';
import { ChatContext } from './chat/ChatContext';

export const AuthContext = createContext();

const initalState = {
	uid: null,
	checking: true,
	logged: false,
	name: null,
	email: null,
};

const AuthProvider = ({ children }) => {
	const { dispatch } = useContext(ChatContext);
	const [auth, setAuth] = useState(initalState);

	const login = async (email, password) => {
		const { jwt, ok, user, msg } = await fetchWOToken(
			'auth/login',
			{ email, password },
			'POST'
		);
		if (ok) {
			localStorage.setItem('token', jwt);
			setAuth({
				uid: user.uid,
				checking: false,
				logged: true,
				name: user.name,
				email: user.email,
			});
		}
		return { ok, msg };
	};

	const register = async (email, name, password) => {
		const { jwt, ok, user, msg } = await fetchWOToken(
			'auth/new',
			{ email, password, name },
			'POST'
		);

		if (ok) {
			localStorage.setItem('token', jwt);
			setAuth({
				uid: user.uid,
				checking: false,
				logged: true,
				name: user.name,
				email: user.email,
			});
		}

		return { ok, msg };
	};

	const logout = () => {
		dispatch({
			type: types.CLEAN_ON_LOGOUT,
			payload: initalState,
		});

		localStorage.removeItem('token');
		setAuth({
			logged: false,
		});
	};

	const verifyToken = useCallback(async () => {
		const token = localStorage.getItem('token');
		if (!token) {
			return setAuth({
				checking: false,
				logged: false,
			});
		}

		const { ok, jwt, user } = await fetchWToken('auth/refresh');

		if (ok) {
			localStorage.setItem('token', jwt);
			setAuth({
				uid: user.uid,
				checking: false,
				logged: true,
				name: user.name,
				email: user.email,
			});
		} else {
			setAuth({
				checking: false,
				logged: false,
			});
		}
	}, []);

	return (
		<AuthContext.Provider
			value={{
				login,
				register,
				logout,
				verifyToken,
				auth,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
