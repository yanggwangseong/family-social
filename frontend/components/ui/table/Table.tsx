import React, { FC } from 'react';
import Field from '@/ui/field/Field';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

const Table: FC<{ isPeriods: string[] }> = ({ isPeriods }) => {
	const tableHeaderCol = [
		[
			{ item: '일자' },
			{ item: '요일' },
			{ item: '시작시간' },
			{ item: '종료시간' },
		],
	];

	return (
		<table className="w-full">
			<thead>
				{tableHeaderCol.map((tr, index) => (
					<tr key={index}>
						{tr.map((data, idx) => (
							<th key={idx} className="p-4 font-normal text-customGray">
								{data.item}
							</th>
						))}
					</tr>
				))}
			</thead>
			<tbody>
				{isPeriods.map((period, index) => {
					const date = new Date(period);
					return (
						<tr key={index}>
							<td className="p-4" align="center">
								{format(date, 'yyyy-MM-dd', {
									locale: ko,
								})}
							</td>
							<td className="p-4" align="center">
								{format(date, 'eee', {
									locale: ko,
								})}
							</td>
							<td className="p-4" align="center">
								<Field
									className="w-full bg-basic"
									type="time"
									name="startTime"
									defaultValue="10:00"
								/>
							</td>
							<td className="p-4" align="center">
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
			</tbody>
		</table>
	);
};

export default Table;
