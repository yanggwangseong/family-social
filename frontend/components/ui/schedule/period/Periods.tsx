import React, { FC } from 'react';
import Field from '@/ui/field/Field';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import Table from '@/ui/table/Table';
import styles from './Periods.module.scss';

const Periods: FC<{ isPeriods: string[] }> = ({ isPeriods }) => {
	const tableHeaderCol = [
		[
			{ item: '일자' },
			{ item: '요일' },
			{ item: '시작시간' },
			{ item: '종료시간' },
		],
	];

	return (
		<div className={styles.period_container}>
			<Table headerColumns={tableHeaderCol}>
				{isPeriods.map((period, index) => {
					const date = new Date(period);
					return (
						<tr key={index}>
							<td className={styles.table_row} align="center">
								{format(date, 'yyyy-MM-dd', {
									locale: ko,
								})}
							</td>
							<td className={styles.table_row} align="center">
								{format(date, 'eee', {
									locale: ko,
								})}
							</td>
							<td className={styles.table_row} align="center">
								<Field
									className="w-full bg-basic"
									type="time"
									name="startTime"
									defaultValue="10:00"
								/>
							</td>
							<td className={styles.table_row} align="center">
								<Field
									className="w-full bg-basic"
									type="time"
									name="endTime"
									defaultValue="22:00"
								/>
							</td>
						</tr>
					);
				})}
			</Table>
		</div>
	);
};

export default Periods;
