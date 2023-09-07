import { Injectable } from '@nestjs/common';
import { FamsRepository } from './fams.repository';

@Injectable()
export class FamsService {
	constructor(private readonly famsRepository: FamsRepository) {}
}
