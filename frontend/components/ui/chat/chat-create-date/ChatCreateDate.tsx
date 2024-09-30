import React, { FC } from 'react';
import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';
import styles from './ChatCreateDate.module.scss';

const ChatCreateDate: FC<{ createdAt: string }> = ({ createdAt }) => {
	return (
		<div className={styles.chat_date}>
			{format(parseISO(createdAt), 'a h:mm', {
				locale: ko,
			})}
		</div>
	);
};

export default ChatCreateDate;
