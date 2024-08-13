import React, { FC, useEffect, useState } from 'react';
import styles from './TourismItem.module.scss';
import { TourismItemProps } from './tourism-item.interface';
import Image from 'next/image';
import { AiOutlinePlus } from 'react-icons/ai';
import { AiOutlineCheck } from 'react-icons/ai';
import cn from 'classnames';
import { ContentTypeName } from '@/constants/content-type.constant';
import { periodAtom } from '@/atoms/periodAtom';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import { selectedPeriodAtom } from '@/atoms/selectedPeriodAtom';
import HeartAndStar from '../heart-and-star/HeartAndStar';
import { useTourismDetailLayerModal } from '@/hooks/useTourismDetailLayerModal';
import { motion } from 'framer-motion';
import { itemVariants } from '@/constants/animation.constant';

const TourismItem: FC<TourismItemProps> = ({ tourItem }) => {
	const router = useRouter();
	const query = router.query as {
		menu: 'TOURCONTENTTYPE' | 'FESTIVAL' | 'TOURSEARCH';
	};

	const [isPeriods, setIsPeriods] = useRecoilState(periodAtom);

	const [isSelectedPeriod, setIsSelectedPeriod] =
		useRecoilState(selectedPeriodAtom);

	const [isAddTourism, setIsAddTourism] = useState<string>('');

	const { handleTourismDetailLayerModal } = useTourismDetailLayerModal(
		tourItem.title,
	);

	/**
	 *
	 * + 아이콘으로 장바구니 담을때
	 */
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
						tourisms: [
							...(item.tourisms || []),
							{
								contentId: tour.contentId,
								stayTime: tour.stayTime,
								tourismImage: tour.tourismImage,
								title: tour.title,
								position: item.tourisms ? item.tourisms.length : 0,
								stayTimeWritable: false,
							},
						],
					};
				}
				return item;
			});

			return updatedPeriods;
		});

		setIsAddTourism(tour.contentId);
	};

	const handleDeleteTourism = (contentId: string) => {
		const newPeriods = isPeriods.map(item => ({
			...item,
			tourisms: item.tourisms?.filter(v => contentId !== v.contentId),
		}));
		setIsPeriods(newPeriods);
		setIsAddTourism('');
	};

	// 관광 타입이나 행사/축제/ 키워드 검색 어디든 이미 담은 관광 아이템이라면 또 갈일 없으니까 체크 상태 유지 해주기
	useEffect(() => {
		if (isSelectedPeriod) {
			setIsAddTourism(''); // 기본 default값으로 비우고 이후에 속하는 contentId만 담기
			isPeriods.map(item =>
				item.tourisms?.map(v => {
					if (v.contentId === tourItem.contentid) {
						setIsAddTourism(v.contentId);
					}
				}),
			);
		}
	}, [isPeriods, isSelectedPeriod, tourItem.contentid]);

	return (
		<motion.div variants={itemVariants} className={styles.container}>
			<div className={styles.tour_item_card}>
				<div
					className={styles.tour_img_title_container}
					onClick={() =>
						handleTourismDetailLayerModal(
							tourItem.contentid,
							tourItem.contenttypeid,
						)
					}
				>
					<div className={styles.img_container}>
						<Image fill src={tourItem.firstimage} alt="img"></Image>
					</div>
					<div className={styles.tour_description_container}>
						<div className={styles.tour_title}>{tourItem.title}</div>
						<div className={styles.tour_addr_container}>
							<div className={styles.tour_content_type_name}>
								{ContentTypeName['12']}
							</div>
							<div className={styles.tour_addr}>{tourItem.addr1}</div>
						</div>
						{/* heart와 별점 */}
						<HeartAndStar></HeartAndStar>
					</div>
				</div>
				<div className={styles.tour_right_btn_container}>
					{isAddTourism && isAddTourism === tourItem.contentid ? (
						<div
							className={cn(styles.btn_container, {
								[styles.active]: isAddTourism === tourItem.contentid,
							})}
							onClick={() => handleDeleteTourism(tourItem.contentid)}
						>
							<AiOutlineCheck size={24} color="#0a0a0a" />
						</div>
					) : (
						<div className={styles.btn_container}>
							<AiOutlinePlus
								size={24}
								onClick={() =>
									handleChagePeriods({
										contentId: tourItem.contentid,
										stayTime: '02:00',
										tourismImage: tourItem.firstimage,
										title: tourItem.title,
									})
								}
							/>
						</div>
					)}
				</div>
			</div>
		</motion.div>
	);
};

export default TourismItem;
