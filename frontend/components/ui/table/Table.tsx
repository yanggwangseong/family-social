import React, { FC, PropsWithChildren } from 'react';
import styles from './Table.module.scss';
import { TableProps } from './table.interface';

const Table: FC<PropsWithChildren<TableProps>> = ({
	headerColumns,
	children,
}) => {
	return (
		<table className={styles.table_container}>
			<thead>
				{headerColumns.map((tr, index) => (
					<tr key={index}>
						{tr.column.map((data, index) => (
							<>
								<th
									key={index}
									className={styles.table_header_column}
									colSpan={data.colspan}
									rowSpan={data.rowspan}
								>
									{data.item}
								</th>
							</>
						))}
					</tr>
				))}
			</thead>
			<tbody>{children}</tbody>
		</table>
	);
};

export default Table;
