import React, { FC } from 'react';
import { Mention, MentionsInput, SuggestionDataItem } from 'react-mentions';
import style from './MentionField.module.scss';
import { Control, Controller, Path, RegisterOptions } from 'react-hook-form';
import { MemberService } from '@/services/member/member.service';
import { useQuery } from 'react-query';
import { MentionFieldProps } from './mention-field.interface';
import Profile from '../profile/Profile';

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
						profileImg: item.profileImage,
						email: item.email,
					};
				});
			},
		},
	);

	const renderUserSuggestion = (
		suggestion: SuggestionDataItem,
		search: string,
		highlightedDisplay: React.ReactNode,
		index: number,
		focused: boolean,
	) => {
		if (!data) {
			return null;
		}

		return (
			<Profile
				username={suggestion.display}
				searchMember={{
					id: data[index].id,
					username: data[index].display,
					email: data[index].email,
					profileImage: data[index].profileImg,
				}}
			></Profile>
		);
	};

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
									renderSuggestion={renderUserSuggestion}
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
