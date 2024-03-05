import React, { FC } from 'react';
import styles from './CreateMessageModal.module.scss';
import { useRecoilState } from 'recoil';
import { createMessageModalAtom } from '@/atoms/createMessageModalAtom';

const CreateMessageModal: FC = () => {
	const [createLayer, setCreateLayer] = useRecoilState<boolean>(
		createMessageModalAtom,
	);

	return (
		<>
			{createLayer && (
				<div className={styles.container}>
					<div>dfdfdfdsfsdf</div>
				</div>
			)}
		</>
	);
};

export default CreateMessageModal;
