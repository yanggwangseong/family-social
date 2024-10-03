import { socket } from 'pages/clients';
import { useEffect, useRef, useState } from 'react';

export const useWebRTC = (roomId: string) => {
	const [localStream, setLocalStream] = useState<MediaStream | null>(null);
	const [remoteStreams, setRemoteStreams] = useState<{
		[key: string]: MediaStream;
	}>({});
	const peerConnections = useRef<{ [key: string]: RTCPeerConnection }>({});
	const localStreamRef = useRef<MediaStream | null>(null); // Use ref for localStream

	const createPeerConnection = (userId: string, stream: MediaStream) => {
		const peerConnection = new RTCPeerConnection();
		peerConnections.current[userId] = peerConnection;

		stream.getTracks().forEach(track => {
			peerConnection.addTrack(track, stream);
		});

		peerConnection.onicecandidate = event => {
			if (event.candidate) {
				socket.emit('ice-candidate', {
					to: userId,
					candidate: event.candidate,
				});
			}
		};

		peerConnection.ontrack = event => {
			setRemoteStreams(prev => ({
				...prev,
				[userId]: event.streams[0],
			}));
		};

		return peerConnection;
	};

	useEffect(() => {
		const currentPeerConnections = peerConnections.current; // 클린업 함수에서 사용할 참조 저장

		const initWebRTC = async () => {
			try {
				const stream = await navigator.mediaDevices.getUserMedia({
					video: true,
					audio: true,
				});
				setLocalStream(stream);
				localStreamRef.current = stream; // Store stream in ref

				socket.emit('join-room', roomId);

				socket.on('user-connected', (userId: string) => {
					const peerConnection = createPeerConnection(userId, stream);

					peerConnection
						.createOffer()
						.then(offer => peerConnection.setLocalDescription(offer))
						.then(() => {
							socket.emit('offer', {
								to: userId,
								offer: peerConnection.localDescription,
							});
						});
				});

				socket.on('offer', async ({ from, offer }) => {
					const peerConnection = createPeerConnection(from, stream);
					await peerConnection.setRemoteDescription(offer);
					const answer = await peerConnection.createAnswer();
					await peerConnection.setLocalDescription(answer);
					socket.emit('answer', { to: from, answer });
				});

				socket.on('answer', ({ from, answer }) => {
					peerConnections.current[from]?.setRemoteDescription(answer);
				});

				socket.on('ice-candidate', ({ from, candidate }) => {
					peerConnections.current[from]?.addIceCandidate(
						new RTCIceCandidate(candidate),
					);
				});
			} catch (error) {
				console.error('Error initializing WebRTC:', error);
			}
		};

		initWebRTC();

		return () => {
			// Clean up socket listeners
			socket.off('user-connected');
			socket.off('offer');
			socket.off('answer');
			socket.off('ice-candidate');

			// Stop local stream tracks
			localStreamRef.current?.getTracks().forEach(track => track.stop());

			// Close all peer connections
			Object.values(currentPeerConnections).forEach(pc => pc.close());
		};
	}, [roomId]);

	return { localStream, remoteStreams };
};
