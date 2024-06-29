import React, { FC } from 'react';
import { EventTypeIconProp } from './event-type-icon.interface';
import styles from './EventTypeIcon.module.scss';

const EventTypeIcon: FC<EventTypeIconProp> = ({ Icon, iconSize }) => {
	return (
		<div className={styles.icon}>
			<Icon size={iconSize} />
		</div>
	);
};

export default EventTypeIcon;
