import React, { FC } from 'react';
import styles from './ChatJoinMemberCount.module.scss';

const ChatJoinMemberCount: FC<{ joinMemberCount: number }> = ({
	joinMemberCount,
}) => {
	return <div className={styles.chat_join_member_count}>{joinMemberCount}</div>;
};

export default ChatJoinMemberCount;
