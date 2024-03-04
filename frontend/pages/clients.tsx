import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { Socket, io } from 'socket.io-client';
import { ACCESS_TOKEN_KEY, SOCKET_URL } from '../constants';
import { getCookie } from '@/utils/cookie';

export let socket: Socket;
const ClientsPage: NextPage = () => {
	const router = useRouter();

	const useEffectHandler = () => {
		const accessToken = getCookie(ACCESS_TOKEN_KEY as string);

		socket = io(`${SOCKET_URL}/chats`, {
			transports: ['websocket'],
			withCredentials: true,
			auth: {
				authorization: accessToken,
			},
		});

		socket.on('connect', () => {
			socket.emit('auth', 'world', () => {});
		});

		socket.on('disconnect', () => {
			console.log('disconnet');
		});
	};

	useEffect(useEffectHandler, []);

	return (
		<div>
			<h1>Socket.io</h1>
		</div>
	);
};

export default ClientsPage;
