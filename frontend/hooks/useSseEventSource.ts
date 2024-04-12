import { getCookie } from '@/utils/cookie';
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';
import { useEffect, useState } from 'react';
import { ACCESS_TOKEN_KEY, API_URL } from '../constants';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const useSseEventSource = (sseUrl: string) => {
	const EventSource = EventSourcePolyfill || NativeEventSource;

	const [isSseListening, setIsSseListening] = useState<boolean>(false);

	useEffect(() => {
		let eventSource: EventSource;
		const accessToken = getCookie(ACCESS_TOKEN_KEY!);

		const fetchSse = () => {
			eventSource = new EventSource(`${API_URL}${sseUrl}`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
				withCredentials: true,
			});

			eventSource.onmessage = event => {
				setIsSseListening(true);
				const json = JSON.parse(event.data);
				const { data } = json;
				Notify.info(data.message);
			};
			eventSource.onerror = event => {
				setIsSseListening(false);
			};
		};

		if (!isSseListening) {
			fetchSse();
		}
		return () => eventSource.close();
	}, [EventSource, isSseListening, sseUrl]);

	return { isSseListening, setIsSseListening };
};
