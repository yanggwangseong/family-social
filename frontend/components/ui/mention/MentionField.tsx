import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { Mention, MentionsInput, OnChangeHandlerFunc } from 'react-mentions';
import style from './MentionField.module.scss';
import {
	Control,
	Controller,
	FieldErrors,
	SubmitHandler,
	useForm,
} from 'react-hook-form';

const MentionField: FC<{
	errors: FieldErrors<{ commentContents: string }>;
	control: Control<{ commentContents: string }>;
}> = ({ errors, control }) => {
	const data = [
		{
			id: '7dd8f87b-fe25-4a12-956a-9511efdfc3fb',
			display: 'nestyang',
		},
		{
			id: '83491506-9047-4cfc-9dec-9f1e2016ae13',
			display: 'test2',
		},
		{
			id: '31a3ff5a-3715-43ca-a419-2b949a0dee53',
			display: '양광성',
		},
		{
			id: 'Iamvictorsam',
			display: 'iamvictorsam@gmail.com',
		},
	];

	return (
		<>
			{/* <MentionsInput
				value={result}
				//onChange={e => setResult(e.target.value)}
				classNames={style}
				{...register('commentContents', {
					maxLength: {
						value: 2000,
						message: '최대 2000자까지 가능합니다',
					},
					onChange: e => setResult(e.target.value),
				})}
			>
				<Mention
					className={style.mentions__mention}
					trigger="@"
					data={data}
					displayTransform={(id, display) => `@${display} `}
					markup="@[__display__](__id__) "
				/>
			</MentionsInput> */}

			<Controller
				name="commentContents"
				control={control}
				rules={{
					maxLength: {
						value: 2000,
						message: '최대 2000자까지 가능합니다',
					},
				}}
				render={({ field }) => (
					<MentionsInput
						value={field.value}
						classNames={style}
						allowSuggestionsAboveCursor={true}
						onChange={e => field.onChange(e.target.value)}
					>
						<Mention
							className={style.mentions__mention}
							trigger="@"
							data={data}
							displayTransform={(id, display) => `@${display} `}
							markup="@[__display__](__id__) "
						/>
					</MentionsInput>
				)}
			/>

			{errors && errors.commentContents && (
				<div>{errors.commentContents.message}</div>
			)}
		</>
	);
};

export default MentionField;
