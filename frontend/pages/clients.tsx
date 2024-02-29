import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { Socket, io } from 'socket.io-client';
import { SOCKET_URL } from '../constants';

export let socket: Socket;
const ClientsPage: NextPage = () => {
	const router = useRouter();

	const useEffectHandler = () => {
		socket = io(`ws://localhost:3000/chats`, {
			transports: ['websocket'],
			extraHeaders: {
				Authorization: 'abc',
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
