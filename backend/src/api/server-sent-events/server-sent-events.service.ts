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
}
