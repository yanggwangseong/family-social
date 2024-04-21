import { useAnimate } from 'framer-motion';
import { useEffect, useState } from 'react';

export const useMenuAnimation = (isShowing: boolean) => {
	const [sidebarScope, animate] = useAnimate();

	useEffect(() => {
		animate([
			[
				sidebarScope.current,
				{
					transform: isShowing ? 'translateX(0%)' : 'translateX(-100%)',
				},
				{ ease: [0.08, 0.65, 0.53, 0.96], duration: 0.6 },
			],
		]);
	}, [animate, isShowing, sidebarScope]);

	return {
		sidebarScope,
	};
};
