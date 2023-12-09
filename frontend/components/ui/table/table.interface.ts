export interface TableProps {
	headerColumns: headerRowType[];
}

export interface headerRowType {
	rowspan?: number;
	colspan?: number;
	column: headerColumnType[];
}

export interface headerColumnType {
	item: string;
}
