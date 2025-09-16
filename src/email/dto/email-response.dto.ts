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
