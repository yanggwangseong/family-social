import { useRouter } from 'next/router';

export const useRedirectUrl = () => {
	const router = useRouter();
	const { redirect_url } = router.query as { redirect_url?: string };

	return {
		redirect_url,
		router,
	};
};
