import { createContext, useContext, useEffect } from 'react';
import { useSocket } from '../hooks/useSocket';
import { AuthContext } from './AuthContext';
import { ChatContext } from './chat/ChatContext';
import types from '../types';
import { scrollToBottomAnimated } from '../helpers/scrollToBottom';

export const SocketContext = createContext();

const SocketProvider = ({ children }) => {
	const { socket, online, connectSocket, disconnectSocket } = useSocket(
		'http://localhost:8080'
	);

	const { auth } = useContext(AuthContext);
	const { dispatch } = useContext(ChatContext);

	useEffect(() => {
		if (auth.logged) {
			connectSocket();
		}
	}, [auth.logged, connectSocket]);

	useEffect(() => {
		if (!auth.logged) {
			disconnectSocket();
		}
	}, [auth.logged, disconnectSocket]);

	// listen to changes of connected users
	useEffect(() => {
		socket?.on('user-list', (userList) => {
			dispatch({
				type: types.GET_USER_LIST,
				payload: userList,
			});
		});
	}, [dispatch, socket]);

	// Listen to personal messages
	useEffect(() => {
		socket?.on('personal-message', (message) => {
			dispatch({
				type: types.NEW_MESSAGE,
				payload: message,
			});

			scrollToBottomAnimated('chatbox');
		});
	}, [dispatch, socket]);

	return (
		<SocketContext.Provider value={{ socket, online }}>
			{children}
		</SocketContext.Provider>
	);
};

export default SocketProvider;
