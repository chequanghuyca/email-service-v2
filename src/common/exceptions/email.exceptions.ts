import { InternalServerErrorException } from '@nestjs/common';

export class EmailSendException extends InternalServerErrorException {
	constructor(message: string, error?: any) {
		super({
			message: `Failed to send email: ${message}`,
			error: error?.message || error,
		});
	}
}

export class EmailServiceConnectionException extends InternalServerErrorException {
	constructor(error: any) {
		super({
			message: 'Email service connection failed',
			error: error?.message || error,
		});
	}
}
