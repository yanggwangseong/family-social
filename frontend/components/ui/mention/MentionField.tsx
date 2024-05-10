import React, { FC } from 'react';
import { Mention, MentionsInput } from 'react-mentions';
import style from './MentionField.module.scss';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { MemberService } from '@/services/member/member.service';
import { useQuery } from 'react-query';

const MentionField: FC<{
	errors: FieldErrors<{ commentContents: string }>;
	control: Control<{ commentContents: string }>;
}> = ({ errors, control }) => {
	const { isSuccess, data } = useQuery(
		['get-all-members'],
		async () => await MemberService.getAllMembers(),
		{
			select: data => {
				return data.map(item => {
					return {
						id: item.id,
						display: item.username,
					};
				});
			},
		},
	);

	return (
		<>
			{data && (
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
							onChange={e => {
								field.onChange(e.target.value);
							}}
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
			)}

			{errors && errors.commentContents && (
				<div>{errors.commentContents.message}</div>
			)}
		</>
	);
};

export default MentionField;
