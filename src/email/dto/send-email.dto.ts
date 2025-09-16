import { IsEmail, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PortfolioResponseDto {
	@ApiProperty({
		description: 'Recipient email address',
		example: 'user@example.com',
	})
	@IsEmail()
	email: string;

	@ApiProperty({
		description: 'Message from the visitor',
		example: 'I am interested in your work and would like to discuss a project.',
	})
	@IsString()
	message: string;

	@ApiProperty({
		description: 'Name of the visitor',
		example: 'John Doe',
	})
	@IsString()
	name: string;
}

export class WelcomeUserDto {
	@ApiProperty({
		description: 'User email address',
		example: 'user@example.com',
	})
	@IsEmail()
	email: string;

	@ApiProperty({
		description: 'User name',
		example: 'John Doe',
	})
	@IsString()
	name: string;

	@ApiProperty({
		description: 'Login URL for the user',
		example: 'https://transmaster.com/login',
	})
	@IsUrl()
	loginUrl: string;
}
