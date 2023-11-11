import { LottieRefCurrentProps } from 'lottie-react';
import { useEffect, useRef, useState } from 'react';

export const useLottieLike = () => {
	const [isLottie, setIsLottie] = useState<boolean>(false);

	const lottieRef = useRef<LottieRefCurrentProps>(null);

	useEffect(() => {
		if (lottieRef.current) {
			lottieRef.current.stop();
			if (lottieRef.current?.animationContainerRef.current) {
				lottieRef.current.animationContainerRef.current.style.visibility =
					'hidden';
			}
			if (isLottie) {
				lottieRef.current.play();
				if (lottieRef.current?.animationContainerRef.current) {
					lottieRef.current.animationContainerRef.current.style.visibility =
						'visible';
				}
			}
		}
	}, [isLottie]);

	const handleLottieComplete = () => {
		if (lottieRef.current) {
			lottieRef.current.stop();
			if (lottieRef.current?.animationContainerRef.current) {
				lottieRef.current.animationContainerRef.current.style.visibility =
					'hidden';
			}
			handleIsLottie(false);
			//lottieRef.current.animationContainerRef.current?.style.visibility = 'hidden'
			//lottieRef.current.animationContainerRef.current?.remove();
		}
	};

	const handleIsLottie = (status: boolean) => {
		setIsLottie(status);
	};

	return {
		handleIsLottie,
		isLottie,
		lottieRef,
		handleLottieComplete,
	};
};
