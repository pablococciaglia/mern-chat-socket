import { useCallback, useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';
export const useSocket = (serverPath) => {
	const [socket, setSocket] = useState(null);
	const [online, setonline] = useState(false);

	const connectSocket = useCallback(() => {
		const token = localStorage.getItem('token');

		const socketTemp = io.connect(serverPath, {
			transports: ['websocket'],
			autoConnect: true,
			forceNew: true,
			query: {
				'x-token': token,
			},
		});
		setSocket(socketTemp);
	}, [serverPath]);

	const disconnectSocket = useCallback(() => {
		socket?.disconnect();
	}, [socket]);

	useEffect(() => {
		setonline(socket?.connected);
	}, [socket]);

	useEffect(() => {
		socket?.on('connect', () => {
			setonline(true);
		});
	}, [socket]);

	useEffect(() => {
		socket?.on('disconnect', () => {
			setonline(false);
		});
	}, [socket]);

	return { socket, online, connectSocket, disconnectSocket };
};
