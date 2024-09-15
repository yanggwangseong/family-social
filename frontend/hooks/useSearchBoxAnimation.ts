import { useAnimate } from 'framer-motion';
import { useEffect, useState } from 'react';

export const useSearchBoxAnimation = (
	debounceSearch: string,
	isFocused: boolean,
) => {
	const [searchBoxScope, animate] = useAnimate();

	useEffect(() => {
		animate([
			[
				searchBoxScope.current,
				{
					height: debounceSearch || isFocused ? 'auto' : 0,
					opacity: debounceSearch || isFocused ? 1 : 0,
				},
				{ ease: [0.08, 0.65, 0.53, 0.96], duration: 0.3 },
			],
		]);
	}, [animate, debounceSearch, isFocused, searchBoxScope]);

	return {
		searchBoxScope,
	};
};
