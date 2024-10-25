import React, { FC, useState } from 'react';
import LayerModalVariantWrapper from '../LayerModalVariantWrapper';
import styles from './LinkInvite.module.scss';
import Field from '@/components/ui/field/Field';
import { useForm } from 'react-hook-form';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { GroupService } from '@/services/group/group.service';
import { GroupInviteLinkPaginateLimit } from 'types';
import { FaCheck, FaRegCopy } from 'react-icons/fa';

const LinkInvite: FC = () => {
	const { groupId } = useRouter().query as { groupId: string };
	const [isLinkCreated, setIsLinkCreated] = useState(false);
	const [isCopied, setIsCopied] = useState(false);
	const {
		register,
		formState: { errors, isValid },
		handleSubmit,
		reset,
		getValues,
		watch,
	} = useForm<{ maxUses: GroupInviteLinkPaginateLimit }>({
		mode: 'onChange',
	});

	const createInviteLink = () => {
		setIsLinkCreated(true);
	};

	const { data, isLoading } = useQuery(
		['get-invite-link', groupId, getValues('maxUses')],
		async () =>
			await GroupService.getInviteLinkByGroupId(groupId, getValues('maxUses')),
		{
			enabled: isLinkCreated, // 링크 생성 후에만 데이터 호출
		},
	);

	const copyToClipboard = async () => {
		if (data) {
			await navigator.clipboard.writeText(data);
			setIsCopied(true);
			setTimeout(() => setIsCopied(false), 2000); // 2초 후 복사 상태 초기화
		}
	};

	return (
		<LayerModalVariantWrapper>
			<div className={styles.container}>
				<div className={styles.section_title}>링크 초대</div>
				<div className={styles.section_sub_title}>
					초대 링크를 복사하여 최대 20명까지 초대 할 수 있습니다
				</div>
				{!isLinkCreated && (
					<div className={styles.invite_field_container}>
						<div className={styles.field_wrap}>
							<Field
								fieldClass={'inline_input'}
								labelText={'초대 인원 수'}
								type="number"
								{...register('maxUses', {
									required: true,
									validate: value => {
										if (value < 1 || value > 20) {
											return '최대 1 ~20명까지 초대 할 수 있습니다';
										}
										return true;
									},
								})}
								placeholder="초대 인원 수를 입력해주세요!"
								error={errors.maxUses}
							></Field>
						</div>
						<div className={styles.add_invite_link_btn}>
							<CustomButton
								type="button"
								className="bg-customOrange text-customDark text-sm
                            font-bold border border-solid border-customDark w-full mt-3 
                            rounded hover:opacity-80 py-2 px-1"
								onClick={isValid ? createInviteLink : undefined}
								disabled={!isValid}
							>
								링크 생성
							</CustomButton>
						</div>
					</div>
				)}
				{isLinkCreated && data && (
					<div className={styles.link_container}>
						<div className={styles.generated_link}>
							<span>{data}</span>
							<button onClick={copyToClipboard} className={styles.copy_button}>
								{isCopied ? <FaCheck /> : <FaRegCopy />}
							</button>
						</div>
						<div className={styles.link_info}>
							이 링크는 <strong>2일</strong> 또는{' '}
							<strong>{getValues('maxUses')}명</strong>이 클릭한 후 만료됩니다.
						</div>
					</div>
				)}
			</div>
		</LayerModalVariantWrapper>
	);
};

export default LinkInvite;
