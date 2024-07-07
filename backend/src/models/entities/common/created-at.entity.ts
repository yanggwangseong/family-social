import { CreatedAtDecorator } from '@/common/decorators/entity/created-at.decorator';

export abstract class CreatedAtEntity {
	@CreatedAtDecorator()
	createdAt!: Date;
}
