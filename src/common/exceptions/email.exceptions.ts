import { BadRequestException, InternalServerErrorException } from '@nestjs/common';

export class InvalidEmailException extends BadRequestException {
	constructor(email: string) {
		super(`Invalid email address: ${email}`);
	}
}

export class EmailTemplateNotFoundException extends BadRequestException {
	constructor(templateName: string) {
		super(`Email template '${templateName}' not found`);
	}
}

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
