import { useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';
import { ACCESS_TOKEN_KEY, SOCKET_URL } from '../constants';
import { getCookie } from '@/utils/cookie';

export let socket: Socket;

export const useSocket = () => {
	const [isConnected, setConnected] = useState<boolean>(false);

	const onConnect = () => {
		setConnected(true);
	};

	const onDisConnect = () => {
		setConnected(false);
	};

	useEffect(() => {
		const accessToken = getCookie(ACCESS_TOKEN_KEY as string);

		socket = io(`${SOCKET_URL}/chats`, {
			transports: ['websocket'],
			withCredentials: true,
			auth: {
				authorization: accessToken,
			},
		});

		socket.on('connect', () => onConnect);
		socket.on('disconnect', () => onDisConnect);

		return () => {
			socket.off('connect', onConnect);
			socket.off('disconnect', onDisConnect);
		};
	}, [isConnected]);

	return {
		socket,
		isConnected,
	};
};
