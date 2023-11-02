import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import React, { FC } from 'react';
import styles from './LottieLike.module.scss';
import heartAnimation from '@/assets/lottie/like.json';

const LottieLike: FC<{
	lottieRef: React.RefObject<LottieRefCurrentProps>;
	onLottieComplete: () => void;
}> = ({ lottieRef, onLottieComplete }) => {
	return (
		<Lottie
			className={styles.lottie_container}
			animationData={heartAnimation}
			loop={false}
			lottieRef={lottieRef}
			onComplete={onLottieComplete}
		/>
	);
};

export default LottieLike;
