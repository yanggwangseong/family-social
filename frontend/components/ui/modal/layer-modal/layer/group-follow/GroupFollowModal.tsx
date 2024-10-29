import React, { FC } from 'react';
import styles from './GroupFollowModal.module.scss';
import { useRecoilState } from 'recoil';
import { groupFollowAtom } from '@/atoms/groupFollowAtom';

const GroupFollowModal: FC = () => {
	const [groupFollowId, setGroupFollow] = useRecoilState(groupFollowAtom);
	console.log(groupFollowId.groupId);

	return <div className={styles.container}>GroupFollowModal</div>;
};

export default GroupFollowModal;
