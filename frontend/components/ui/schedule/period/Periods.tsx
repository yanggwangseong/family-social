import React, { FC } from 'react';
import Field from '@/ui/field/Field';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import Table from '@/ui/table/Table';

const Periods: FC<{ isPeriods: string[] }> = ({ isPeriods }) => {
	return (
		<div className="w-full mt-10">
			<Table isPeriods={isPeriods}></Table>
		</div>
	);
};

export default Periods;
