import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
	getHello(): string {
		return 'Email Service API is running! 📧';
	}

	getHealth(): { status: string; timestamp: string } {
		return {
			status: 'OK',
			timestamp: new Date().toISOString(),
		};
	}
}
