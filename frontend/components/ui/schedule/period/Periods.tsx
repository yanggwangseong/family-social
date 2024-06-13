import React, { FC, Fragment, useRef } from 'react';
import Field from '@/ui/field/Field';
import Table from '@/ui/table/Table';
import styles from './Periods.module.scss';
import { periodTableHeaderCol } from '@/constants/table.constant';
import { PeriodsType } from '@/atoms/periodAtom';
import { TranslateDateFormat } from '@/utils/translate-date-format';

const Periods: FC<{ isPeriods: PeriodsType[] }> = ({ isPeriods }) => {
	console.log('isPeriods=', isPeriods);
	return (
		<div className={styles.period_container}>
			<Table headerColumns={periodTableHeaderCol}>
				{isPeriods.map((period, index) => {
					const [y, m, d] = period.period.split('-');

					const date = new Date(`${parseInt(y)}-${parseInt(m)}-${parseInt(d)}`);

					return (
						<Fragment key={index}>
							<tr>
								<td className={styles.table_row} align="center" rowSpan={2}>
									{TranslateDateFormat(date, 'MM/dd')}
								</td>
								<td className={styles.table_row} align="center" rowSpan={2}>
									{TranslateDateFormat(date, 'eee')}
								</td>
								<td
									className={`${styles.table_row} ${styles.no_boder}`}
									align="center"
								>
									<Field
										className="w-full bg-basic md:text-base text-sm"
										type="time"
										name="startTime"
										defaultValue="10:00"
									/>
								</td>
							</tr>
							<tr>
								<td className={styles.table_row} align="center">
									<Field
										className="w-full bg-basic md:text-base text-sm"
										type="time"
										name="endTime"
										defaultValue="22:00"
									/>
								</td>
							</tr>
						</Fragment>
					);
				})}
			</Table>
		</div>
	);
};

export default Periods;
