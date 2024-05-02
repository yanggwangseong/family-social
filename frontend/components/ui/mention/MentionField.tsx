import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { Mention, MentionsInput, OnChangeHandlerFunc } from 'react-mentions';
import style from './MentionField.module.scss';

const MentionField: FC = () => {
	const [result, setResult] = useState('');

	const data = [
		{
			id: 'Ichigo',
			display: 'Kurosaki Ichigo',
		},
		{
			id: 'Madara',
			display: 'Madara Uchiha',
		},
		{
			id: 'Nobody',
			display: 'nobody@someone.whoknows',
		},
		{
			id: 'Iamvictorsam',
			display: 'iamvictorsam@gmail.com',
		},
	];

	useEffect(() => {
		console.log(result);
	}, [result]);

	return (
		<MentionsInput
			value={result}
			onChange={e => setResult(e.target.value)}
			classNames={style}
		>
			<Mention className={style.mentions__mention} trigger="@" data={data} />
		</MentionsInput>
	);
};

export default MentionField;
