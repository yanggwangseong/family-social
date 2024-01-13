import React, { FC } from 'react';
import styles from './TourSearch.module.scss';
import Field from '@/components/ui/field/Field';

const TourSearch: FC = () => {
	return (
		<div className={styles.container}>
			<Field fieldClass={'input'} placeholder="키워드를 입력하세요."></Field>
		</div>
	);
};

export default TourSearch;
