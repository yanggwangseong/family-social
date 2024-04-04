import { headerRowType } from '@/components/ui/table/table.interface';

export const periodTableHeaderCol: headerRowType[] = [
	{
		column: [
			{ item: '일자', rowspan: 2 },
			{ item: '요일', rowspan: 2 },
			{ item: '시작시간' },
		],
	},
	{
		column: [{ item: '종료시간' }],
	},
];
