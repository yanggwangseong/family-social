import React, { FC, useEffect, useRef } from 'react';
import styles from './CreateVideoCall.module.scss';
import { useWebRTC } from '@/hooks/useWebRTC';
import { useRecoilValue } from 'recoil';
import { videoRoomAtom } from '@/atoms/videoRoomAtom';

const CreateVideoCall: FC = () => {
	const roomId = useRecoilValue(videoRoomAtom);
	const { localStream, remoteStreams } = useWebRTC(roomId);
	const localVideoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		if (localVideoRef.current && localStream) {
			localVideoRef.current.srcObject = localStream;
		}
	}, [localStream]);

	return (
		<div>
			<video ref={localVideoRef} autoPlay muted playsInline />
			{Object.entries(remoteStreams).map(([userId, stream]) => (
				<video
					key={userId}
					autoPlay
					playsInline
					ref={el => {
						if (el) el.srcObject = stream;
					}}
				/>
			))}
		</div>
	);
};

export default CreateVideoCall;
