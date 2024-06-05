import { Injectable, MessageEvent } from '@nestjs/common';
import { Subject, filter, map } from 'rxjs';

@Injectable()
export class ServerSentEventsService {
	private members$: Subject<{ memberId: string }> = new Subject();

	private observer = this.members$.asObservable();

	constructor() {}

	emitNotificationChangeEvent(memberId: string) {
		this.members$.next({ memberId });
	}

	SubscribeNotifications(memberId: string) {
		return this.observer.pipe(
			filter((member) => member.memberId === memberId),

			map(() => {
				return {
					data: {
						message: `새로운 알람이 도착했습니다`,
					},
				} satisfies MessageEvent;
			}),
		);
	}
}
