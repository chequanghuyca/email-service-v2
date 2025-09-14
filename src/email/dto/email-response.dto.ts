import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class EmailResponseDto {
	@ApiProperty({ description: 'Whether the operation was successful' })
	success: boolean;

	@ApiPropertyOptional({ description: 'Message ID from the email service' })
	messageId?: string;

	@ApiProperty({ description: 'Response message' })
	message: string;

	@ApiPropertyOptional({ description: 'Error message if operation failed' })
	error?: string;
}

export class BulkEmailResponseDto {
	@ApiProperty({ description: 'Whether all emails were sent successfully' })
	success: boolean;

	@ApiProperty({ description: 'Number of emails sent successfully' })
	sent: number;

	@ApiProperty({ description: 'Number of emails that failed to send' })
	failed: number;

	@ApiProperty({
		description: 'Detailed results for each email',
		type: [EmailResponseDto],
	})
	results: EmailResponseDto[];
}

export class ConnectionTestResponseDto {
	@ApiProperty({ description: 'Whether the connection test was successful' })
	success: boolean;

	@ApiProperty({ description: 'Test result message' })
	message: string;
}

export class TemplatesResponseDto {
	@ApiProperty({
		description: 'List of available email templates',
		type: [String],
		example: ['welcome', 'reset_password', 'notification'],
	})
	templates: string[];
}
