import React, { FC } from 'react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react'; // basic
import { Swiper as SwiperCore } from 'swiper/types';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { CgArrowLeft, CgArrowRight } from 'react-icons/cg';
import { AiOutlineClose } from 'react-icons/ai';
import Image from 'next/image';
import styles from './SwiperContainer.module.scss';
import { SwiperContainerProps } from './swiper-container.interface';
import cn from 'classnames';

const SwiperContainer: FC<SwiperContainerProps> = ({
	type,
	list,
	overrideSwiperOptions,
	handleExcludeMedia,
}) => {
	const navigationPrevRef = React.useRef(null);
	const navigationNextRef = React.useRef(null);
	const swiperRef = React.useRef<SwiperCore>();

	return (
		<Swiper
			className={cn(styles.swiper_container, {
				[styles.uploaded_swiper]: type === 'create-feed',
				[styles.form_swiper]: type === 'create-feed-form',
			})}
			modules={[Navigation, Pagination, A11y]}
			pagination={{
				clickable: true,
			}}
			onBeforeInit={swiper => {
				swiperRef.current = swiper;
			}}
			navigation={{
				prevEl: navigationPrevRef.current,
				nextEl: navigationNextRef.current,
			}}
			spaceBetween={50}
			slidesPerView={1}
			{...overrideSwiperOptions}
		>
			{type === 'feed-item' &&
				list.map((media, index) => (
					<SwiperSlide key={index} className={styles.swiper_container}>
						<Image
							fill
							src={media.url}
							alt="image"
							style={{ objectFit: 'inherit' }}
						></Image>

						<div
							className={styles.swiper_button_next}
							ref={navigationPrevRef}
							onClick={e => {
								e.stopPropagation();
								swiperRef.current?.slideNext();
							}}
						>
							<CgArrowRight size={24} />
						</div>

						<div
							className={styles.swiper_button_prev}
							ref={navigationNextRef}
							onClick={e => {
								e.stopPropagation();
								swiperRef.current?.slidePrev();
							}}
						>
							<CgArrowLeft size={24} />
						</div>
					</SwiperSlide>
				))}

			{type === 'create-feed' &&
				list.map((media, index) => (
					<SwiperSlide key={index} className={styles.swiper_container}>
						<Image
							fill
							src={media}
							alt="image"
							style={{ objectFit: 'inherit' }}
						></Image>
						{handleExcludeMedia && (
							<div
								className={styles.uploaded_close}
								onClick={() => handleExcludeMedia(index)}
							>
								<AiOutlineClose size={24} color="#0a0a0a" />
							</div>
						)}

						<div
							className={styles.swiper_button_next}
							ref={navigationPrevRef}
							onClick={e => {
								e.stopPropagation();
								swiperRef.current?.slideNext();
							}}
						>
							<CgArrowRight size={24} />
						</div>

						<div
							className={styles.swiper_button_prev}
							ref={navigationNextRef}
							onClick={e => {
								e.stopPropagation();
								swiperRef.current?.slidePrev();
							}}
						>
							<CgArrowLeft size={24} />
						</div>
					</SwiperSlide>
				))}

			{type === 'create-feed-form' &&
				list.map((media, index) => (
					<SwiperSlide key={index} className={styles.swiper_container}>
						<Image
							fill
							src={media}
							alt="image"
							style={{ objectFit: 'inherit' }}
						></Image>
						<div
							className={styles.swiper_button_next}
							ref={navigationPrevRef}
							onClick={e => {
								e.stopPropagation();
								swiperRef.current?.slideNext();
							}}
						>
							<CgArrowRight size={24} />
						</div>

						<div
							className={styles.swiper_button_prev}
							ref={navigationNextRef}
							onClick={e => {
								e.stopPropagation();
								swiperRef.current?.slidePrev();
							}}
						>
							<CgArrowLeft size={24} />
						</div>
					</SwiperSlide>
				))}
		</Swiper>
	);
};

export default SwiperContainer;
