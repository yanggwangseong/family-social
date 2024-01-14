import React, { FC, useEffect, useState } from 'react';
import styles from './TourismItem.module.scss';
import { TourismItemProps } from './tourism-item.interface';
import Image from 'next/image';
import { AiFillHeart } from 'react-icons/ai';
import { AiFillStar } from 'react-icons/ai';
import { AiOutlinePlus } from 'react-icons/ai';
import { AiOutlineCheck } from 'react-icons/ai';
import cn from 'classnames';
import {
	ContentTypeId,
	ContentTypeName,
} from '@/constants/content-type.constant';
import { PeriodsType, TourismType, periodAtom } from '@/atoms/periodAtom';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import { selectedPeriodAtom } from '@/atoms/selectedPeriodAtom';

const TourismItem: FC<TourismItemProps> = ({ tour, onChangePeriods }) => {
	const router = useRouter();
	const query = router.query as {
		menu: 'TOURCONTENTTYPE' | 'FESTIVAL' | 'TOURSEARCH';
	};

	const [isPeriods, setIsPeriods] = useRecoilState(periodAtom);

	const [isSelectedPeriod, setIsSelectedPeriod] =
		useRecoilState(selectedPeriodAtom);

	const [isAddTourism, setIsAddTourism] = useState<string>('');

	const handleChagePeriods = (tour: {
		contentId: string;
		stayTime: string;
		tourismImage: string;
		title: string;
	}) => {
		setIsPeriods(prev => {
			const updatedPeriods = prev.map(item => {
				if (item.period === isSelectedPeriod) {
					return {
						...item,
						tourism: [
							...(item.tourism || []),
							{
								contentId: tour.contentId,
								stayTime: tour.stayTime,
								tourismImage: tour.tourismImage,
								title: tour.title,
								position: item.tourism ? item.tourism.length : 0,
							},
						],
					};
				}
				return item;
			});

			return updatedPeriods;
		});

		setIsAddTourism(`${query.menu}${isSelectedPeriod}${tour.contentId}`);
	};
	// TOURSEARCH tour.contentId

	useEffect(() => {
		if (isSelectedPeriod) {
			console.log(isSelectedPeriod);
		}
	}, [isSelectedPeriod]);

	return (
		<div className={styles.container}>
			<div className={styles.tour_item_card}>
				<div className={styles.tour_img_title_container}>
					<div className={styles.img_container}>
						<Image
							width={120}
							height={100}
							src={tour.firstimage}
							alt="img"
							style={{ height: '100px' }}
						></Image>
					</div>
					<div className={styles.tour_description_container}>
						<div className={styles.tour_title}>{tour.title}</div>
						<div className={styles.tour_addr_container}>
							<div className={styles.tour_content_type_name}>
								{ContentTypeName['12']}
							</div>
							<div className={styles.tour_addr}>{tour.addr1}</div>
						</div>
						<div className={styles.tour_card_footer_container}>
							<div className={styles.heart_container}>
								<AiFillHeart size={14} color="#FB1F42" />
								<span className={styles.score}>0</span>
							</div>
							<div className={styles.star_container}>
								<AiFillStar size={14} color="rgb(253, 224, 71)" />
								<span className={styles.score}>0</span>
							</div>
						</div>
					</div>
				</div>
				<div className={styles.tour_right_btn_container}>
					{isAddTourism ? (
						<div
							className={cn(styles.btn_container, {
								[styles.active]: !!isSelectedPeriod,
							})}
						>
							<AiOutlineCheck size={24} color="#0a0a0a" />
						</div>
					) : (
						<div className={styles.btn_container}>
							<AiOutlinePlus
								size={24}
								onClick={() =>
									handleChagePeriods({
										contentId: tour.contentid,
										stayTime: '02:00',
										tourismImage: tour.firstimage,
										title: tour.title,
									})
								}
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default TourismItem;