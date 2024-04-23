import React, { FC } from 'react';
import styles from './NotFoundSearchMember.module.scss';

const NotFoundSearchMember: FC = () => {
	return (
		<div className={styles.not_found_text}>해당 멤버를 찾을 수 없습니다.</div>
	);
};

export default NotFoundSearchMember;
