import React, { FC } from 'react';
import Field from '@/ui/field/Field';
import Table from '@/ui/table/Table';
import styles from './Periods.module.scss';
import { periodTableHeaderCol } from '@/constants/table.constant';
import { PeriodsType } from '@/atoms/periodAtom';
import { TranslateDateFormat } from '@/utils/translate-date-format';

const Periods: FC<{ isPeriods: PeriodsType[] }> = ({ isPeriods }) => {
	return (
		<div className={styles.period_container}>
			<Table headerColumns={periodTableHeaderCol}>
				{isPeriods.map((period, index) => {
					const date = new Date(period.period);
					return (
						<tr key={index}>
							<td className={styles.table_row} align="center">
								{TranslateDateFormat(date, 'yyyy-MM-dd')}
							</td>
							<td className={styles.table_row} align="center">
								{TranslateDateFormat(date, 'eee')}
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
