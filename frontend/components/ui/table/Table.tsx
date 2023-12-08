import React, { FC, PropsWithChildren } from 'react';
import styles from './Table.module.scss';

const Table: FC<
	PropsWithChildren<{
		headerColumns: {
			item: string;
		}[][];
	}>
> = ({ headerColumns, children }) => {
	return (
		<table className={styles.table_container}>
			<thead>
				{headerColumns.map((tr, index) => (
					<tr key={index}>
						{tr.map((data, idx) => (
							<th key={idx} className={styles.table_header_column}>
								{data.item}
							</th>
						))}
					</tr>
				))}
			</thead>
			<tbody>{children}</tbody>
		</table>
	);
};

export default Table;
