import React, { FC, useState } from 'react';
import Image from 'next/image';
import styles from './TourismCartItem.module.scss';
import { TourismCartItemProps } from './tourism-cart-item.interface';
import { ContentTypeName } from '@/constants/content-type.constant';
import Field from '@/components/ui/field/Field';

const TourismCartItem: FC<TourismCartItemProps> = ({
	dataPosition,
	item,
	onDragOver,
	onDragStart,
	onDragEnd,
	onDrop,
	onDragEnter,
	onDragLeave,
}) => {
	const [isTimeMode, setIsTimeMode] = useState<boolean>(false);

	const handleTimeMode = () => {
		setIsTimeMode(!isTimeMode);
	};

	return (
		<div
			className={styles.schedule_tourism_container}
			data-position={dataPosition}
			onDragOver={onDragOver}
			onDragStart={onDragStart}
			onDragEnd={onDragEnd}
			onDrop={onDrop}
			onDragEnter={onDragEnter}
			onDragLeave={onDragLeave}
			draggable
		>
			<div className={styles.order_container}>
				<div className={styles.order_number}>{dataPosition}</div>
			</div>
			<div className={styles.container}>
				{isTimeMode ? (
					<div className={styles.time_fix_item_card}>
						<div className={styles.stay_time_title}>머무는 시간 설정</div>
						<div className={styles.field_container}>
							<Field
								fieldClass="time_input"
								className="bg-basic w-full"
								type="number"
								name="hour"
								min={0}
								max={24}
								defaultValue={
									item.stayTime.split(':')[0] === '00'
										? '0'
										: item.stayTime.split(':')[0]
								}
							/>
						</div>
						<div className={styles.field_container}>
							<Field
								fieldClass="time_input"
								className="bg-basic w-full"
								type="number"
								name="minute"
								min={0}
								max={59}
								defaultValue={
									item.stayTime.split(':')[1] === '00'
										? '0'
										: item.stayTime.split(':')[1]
								}
							/>
						</div>
						<div className={styles.btn_contaienr}>
							<div className={styles.complete_btn} onClick={handleTimeMode}>
								완료
							</div>
						</div>
					</div>
				) : (
					<div className={styles.tour_item_card}>
						<div className={styles.tour_img_title_container}>
							<div className={styles.img_container}>
								<Image
									width={45}
									height={45}
									src={item.tourismImage}
									alt="img"
									style={{ height: '45px' }}
								></Image>
							</div>
							<div className={styles.tour_description_container}>
								<div className={styles.tour_title}>{item.title}</div>
								<div className={styles.tour_addr_container}>
									<div className={styles.tour_content_type_name}>
										{ContentTypeName['12']}
									</div>
								</div>
							</div>
						</div>
						<div className={styles.tour_right_btn_container}>
							<div className={styles.stay_time} onClick={handleTimeMode}>
								{item.stayTime}
							</div>
							<div className={styles.close_btn}>x</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default TourismCartItem;
