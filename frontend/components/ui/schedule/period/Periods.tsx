import React, { FC } from 'react';

const Periods: FC = () => {
	return (
		<div className="w-full mt-10">
			<table className="w-full">
				<thead>
					<th>일자</th>
					<th>요일</th>
					<th>시작시간</th>
					<th>종료시간</th>
				</thead>
				<tbody>
					<tr>
						<td align="center">12/6</td>
						<td align="center">수</td>
						<td align="center">
							<input
								className="w-[100px] bg-white"
								type="time"
								name="startTime"
								value="10:00"
							/>
						</td>
						<td align="center">
							<input
								className="w-[100px] bg-white"
								type="time"
								name="endTime"
								value="22:00"
							/>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default Periods;
