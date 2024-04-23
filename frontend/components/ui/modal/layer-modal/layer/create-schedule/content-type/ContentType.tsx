import React, { FC, useEffect, useState } from 'react';
import styles from './ContentType.module.scss';
import CustomButton from '@/components/ui/button/custom-button/CustomButton';
import {
	ContentTypeId,
	ContentTypeName,
} from '@/constants/content-type.constant';
import { Union } from 'types';
import cn from 'classnames';
import { contentIdsAtom } from '@/atoms/contentIdAtom';
import { useRecoilState } from 'recoil';
import { modalAtom } from '@/atoms/modalAtom';
import LayerModalVariantWrapper from '../../LayerModalVariantWrapper';

const ContentType: FC = () => {
	const [isAtomContentId, setIsAtomContentId] = useRecoilState(contentIdsAtom);

	const [, setIsShowing] = useRecoilState<boolean>(modalAtom);

	const [isContentId, setIsContentId] = useState<Union<typeof ContentTypeId>[]>(
		[],
	);

	const handleSelectedContentId = (contentId: Union<typeof ContentTypeId>) => {
		setIsContentId(prevContentIds => {
			const isAlreadySelected = prevContentIds.includes(contentId);
			if (isAlreadySelected) {
				return prevContentIds.filter(id => id !== contentId);
			} else {
				return [...prevContentIds, contentId];
			}
		});
	};

	const handleSelectedAll = () => {
		setIsContentId([...ContentTypeId]);
	};

	const handleSelectedComplete = () => {
		setIsAtomContentId([...isContentId]);
		setIsShowing(false);
	};

	useEffect(() => {
		if (isAtomContentId.length > 0) setIsContentId([...isAtomContentId]);
	}, [isAtomContentId]);

	return (
		<LayerModalVariantWrapper className={styles.container}>
			<div className={styles.wrap}>
				<div className={styles.contents_wrap}>
					<div className={styles.content_type_container}>
						<div className={styles.content_type_item_wrap}>
							<div
								className={styles.content_type_item}
								onClick={handleSelectedAll}
							>
								전체
							</div>
						</div>
						{ContentTypeId.map((value, index) => {
							return (
								<div
									key={index}
									className={styles.content_type_item_wrap}
									onClick={() => handleSelectedContentId(value)}
								>
									<div
										className={cn(styles.content_type_item, {
											[styles.active]: isContentId.includes(value),
										})}
									>
										{ContentTypeName[value]}
									</div>
								</div>
							);
						})}
					</div>
				</div>

				<div className={styles.btn_container}>
					<CustomButton
						type="button"
						className="bg-customDark text-customOrange 
									font-bold border border-solid border-customDark 
									rounded-full p-[10px] w-full hover:opacity-80"
						onClick={handleSelectedComplete}
					>
						확인
					</CustomButton>

					<CustomButton
						type="button"
						className="bg-white text-customDark 
									font-bold border border-solid border-customDark 
									rounded-full p-[10px] w-full hover:bg-gray-200"
						onClick={() => setIsShowing(false)}
					>
						취소
					</CustomButton>
				</div>
			</div>
		</LayerModalVariantWrapper>
	);
};

export default ContentType;
