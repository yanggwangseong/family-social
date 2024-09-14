import React, { FC } from 'react';
import styles from './NotFoundSearch.module.scss';

const NotFoundSearch: FC<{ message: string }> = ({ message }) => {
	return <div className={styles.not_found_text}>{message}</div>;
};

export default NotFoundSearch;
