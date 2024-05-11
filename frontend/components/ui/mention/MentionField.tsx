import React, { FC } from 'react';
import { Mention, MentionsInput } from 'react-mentions';
import style from './MentionField.module.scss';
import { Control, Controller, Path, RegisterOptions } from 'react-hook-form';
import { MemberService } from '@/services/member/member.service';
import { useQuery } from 'react-query';
import { MentionFieldProps } from './mention-field.interface';

const MentionField = <T extends Record<string, any>>(
	props: MentionFieldProps<T>,
) => {
	const { fieldName, control, validationOptions, placeholderText } = props;

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
		<div>
			{data && (
				<Controller
					name={fieldName}
					control={control}
					rules={{
						...validationOptions,
					}}
					render={({ field, fieldState: { error } }) => (
						<>
							<MentionsInput
								value={field.value}
								classNames={style}
								allowSuggestionsAboveCursor={true}
								onChange={e => {
									field.onChange(e.target.value);
								}}
								placeholder={placeholderText}
							>
								<Mention
									className={style.mentions__mention}
									trigger="@"
									data={data}
									displayTransform={(id, display) => `@${display} `}
									markup="@[__display__](__id__) "
								/>
							</MentionsInput>
						</>
					)}
				/>
			)}
		</div>
	);
};

export default MentionField;
