import React, { FC, useState } from 'react';
import { Mention, MentionsInput } from 'react-mentions';
import styles from './MentionFieldArea.module.scss';

const MentionFieldArea: FC = () => {
	const [result, setResult] = useState('');

	const users = [
		{
			id: 'walter',
			display: 'Walter White',
		},
		{
			id: 'pipilu',
			display: '皮皮鲁',
		},
		{
			id: 'luxixi',
			display: '鲁西西',
		},
		{
			id: 'satoshi1',
			display: '中本聪',
		},
		{
			id: 'satoshi2',
			display: 'サトシ・ナカモト',
		},
		{
			id: 'nobi',
			display: '野比のび太',
		},
		{
			id: 'sung',
			display: '성덕선',
		},
		{
			id: 'jesse',
			display: 'Jesse Pinkman',
		},
		{
			id: 'gus',
			display: 'Gustavo "Gus" Fring',
		},
		{
			id: 'saul',
			display: 'Saul Goodman',
		},
		{
			id: 'hank',
			display: 'Hank Schrader',
		},
		{
			id: 'skyler',
			display: 'Skyler White',
		},
		{
			id: 'mike',
			display: 'Mike Ehrmantraut',
		},
		{
			id: 'lydia',
			display: 'Lydìã Rôdarté-Qüayle',
		},
	];
	return (
		<>
			<MentionsInput
				value={result}
				onChange={e => setResult(e.target.value)}
				classNames={styles}
				singleLine
			>
				<Mention
					className={styles.mentions__mention}
					trigger={'@'}
					data={users}
					displayTransform={(id, display) => `@${display}`}
				></Mention>
			</MentionsInput>
		</>
	);
};

export default MentionFieldArea;
