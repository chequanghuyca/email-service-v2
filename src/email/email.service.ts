import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { PortfolioResponseDto } from './dto/send-email.dto';
import { EmailResponseDto } from './dto/email-response.dto';
import { EmailSendException } from '../common/exceptions/email.exceptions';
import {
	getBodyMailResponse,
	getSubjectMailResponse,
	MailResponseData,
} from './templates/portfolio-response.template';

@Injectable()
export class EmailService {
	private readonly logger = new Logger(EmailService.name);
	private transporter: nodemailer.Transporter;

	constructor(private configService: ConfigService) {
		this.initializeTransporter();
	}

	private initializeTransporter() {
		// Use Gmail SMTP with user's configuration
		this.transporter = nodemailer.createTransport({
			host: this.configService.get<string>('SYSTEM_EMAIL_HOST', 'smtp.gmail.com'),
			port: this.configService.get<number>('SYSTEM_EMAIL_PORT', 465),
			secure: true, // true for 465, false for other ports
			auth: {
				user: this.configService.get<string>('SYSTEM_EMAIL'),
				pass: this.configService.get<string>('SYSTEM_EMAIL_SERVER'),
			},
		});

		// Verify connection configuration
		this.transporter.verify((error) => {
			if (error) {
				this.logger.error('Email transporter configuration error:', error);
			} else {
				this.logger.log('Email transporter is ready to send messages');
			}
		});
	}

	async sendPortfolioResponse(
		portfolioDto: PortfolioResponseDto,
	): Promise<EmailResponseDto> {
		try {
			const myEmail = this.configService.get<string>('SYSTEM_EMAIL');
			const myPhone = this.configService.get<string>('MY_PHONE', '+84 123 456 789');

			const templateData: MailResponseData = {
				name: portfolioDto.name,
				myPhone: myPhone,
				myEmail: myEmail,
			};

			const htmlContent = getBodyMailResponse(templateData);
			const subject = getSubjectMailResponse();

			const mailOptions: nodemailer.SendMailOptions = {
				from: myEmail,
				to: portfolioDto.email,
				subject: subject,
				html: htmlContent,
			};

			const result = await this.transporter.sendMail(mailOptions);

			this.logger.log(
				`Portfolio response email sent successfully to ${portfolioDto.email}`,
			);

			return {
				success: true,
				messageId: result.messageId,
				message: 'Portfolio response email sent successfully',
			};
		} catch (error) {
			this.logger.error('Failed to send portfolio response email:', error);
			throw new EmailSendException('Portfolio response email delivery failed', error);
		}
	}
}
