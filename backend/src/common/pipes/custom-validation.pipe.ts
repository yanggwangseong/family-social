import {
	Injectable,
	Optional,
	ValidationError,
	ValidationPipe,
	ValidationPipeOptions,
} from '@nestjs/common';

@Injectable()
export class CustomValidationPipe extends ValidationPipe {
	constructor(@Optional() options?: ValidationPipeOptions) {
		super(options);
	}
	_flattenValidationErrors(validationErrors: ValidationError[]) {
		return super.flattenValidationErrors(validationErrors);
	}
}
