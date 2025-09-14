import { IsEmail, IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AttachmentDto {
	@ApiProperty({ description: 'Filename of the attachment', example: 'document.pdf' })
	@IsString()
	filename: string;

	@ApiProperty({ description: 'Base64 encoded content of the file' })
	@IsString()
	content: string; // base64 encoded content

	@ApiPropertyOptional({
		description: 'MIME type of the attachment',
		example: 'application/pdf',
	})
	@IsOptional()
	@IsString()
	contentType?: string;
}

export class SendEmailDto {
	@ApiProperty({ description: 'Recipient email address', example: 'user@example.com' })
	@IsEmail()
	to: string;

	@ApiPropertyOptional({ description: 'CC email addresses', example: ['cc@example.com'] })
	@IsOptional()
	@IsArray()
	@IsEmail({}, { each: true })
	cc?: string[];

	@ApiPropertyOptional({
		description: 'BCC email addresses',
		example: ['bcc@example.com'],
	})
	@IsOptional()
	@IsArray()
	@IsEmail({}, { each: true })
	bcc?: string[];

	@ApiProperty({ description: 'Email subject', example: 'Welcome to our service!' })
	@IsString()
	subject: string;

	@ApiPropertyOptional({ description: 'Plain text content of the email' })
	@IsOptional()
	@IsString()
	text?: string;

	@ApiPropertyOptional({
		description: 'HTML content of the email',
		example: '<h1>Welcome!</h1>',
	})
	@IsOptional()
	@IsString()
	html?: string;

	@ApiPropertyOptional({ description: 'Email attachments', type: [AttachmentDto] })
	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => AttachmentDto)
	attachments?: AttachmentDto[];
}

export class SendBulkEmailDto {
	@IsArray()
	@IsEmail({}, { each: true })
	to: string[];

	@IsString()
	subject: string;

	@IsOptional()
	@IsString()
	text?: string;

	@IsOptional()
	@IsString()
	html?: string;

	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => AttachmentDto)
	attachments?: AttachmentDto[];
}

export class SendTemplateEmailDto {
	@IsEmail()
	to: string;

	@IsOptional()
	@IsArray()
	@IsEmail({}, { each: true })
	cc?: string[];

	@IsOptional()
	@IsArray()
	@IsEmail({}, { each: true })
	bcc?: string[];

	@IsString()
	template: string;

	@IsOptional()
	variables?: Record<string, any>;

	@IsString()
	subject: string;
}
