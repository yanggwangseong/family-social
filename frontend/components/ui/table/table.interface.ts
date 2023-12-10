export interface TableProps {
	headerColumns: headerRowType[];
}

export interface headerRowType {
	column: headerColumnType[];
}

export interface headerColumnType {
	item: string;
	rowspan?: number;
	colspan?: number;
}
