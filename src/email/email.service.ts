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
			const myPhone = this.configService.get<string>(
				'SYSTEM_PHONE_NUMBER',
				'+84 939.260.508',
			);

			// 1. Gửi email cảm ơn cho người dùng
			const templateData: MailResponseData = {
				name: portfolioDto.name,
				myPhone: myPhone,
				myEmail: myEmail,
			};

			const htmlContent = getBodyMailResponse(templateData);
			const subject = getSubjectMailResponse();

			const thankYouMailOptions: nodemailer.SendMailOptions = {
				from: myEmail,
				to: portfolioDto.email,
				subject: subject,
				html: htmlContent,
			};

			// 2. Gửi email thông báo cho chính tôi
			const notificationSubject = `🔔 Portfolio Contact: ${portfolioDto.name}`;
			const notificationContent = `
				<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
					<h2 style="color: #667eea; margin-bottom: 20px;">📩 New Portfolio Contact</h2>
					
					<div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0;">
						<p style="margin: 0 0 10px 0;"><strong>Name:</strong> ${portfolioDto.name}</p>
						<p style="margin: 0 0 10px 0;"><strong>Email:</strong> ${portfolioDto.email}</p>
						<p style="margin: 0 0 10px 0;"><strong>Message:</strong></p>
						<div style="background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #667eea;">
							${portfolioDto.message}
						</div>
					</div>
					
					<p style="color: #666; font-size: 14px; margin-top: 20px;">
						📅 Received at: ${new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}
					</p>
				</div>
			`;

			const notificationMailOptions: nodemailer.SendMailOptions = {
				from: myEmail,
				to: myEmail,
				subject: notificationSubject,
				html: notificationContent,
			};

			const [thankYouResult] = await Promise.all([
				this.transporter.sendMail(thankYouMailOptions),
				this.transporter.sendMail(notificationMailOptions),
			]);

			this.logger.log(
				`Portfolio emails sent successfully: Thank you to ${portfolioDto.email}, Notification to ${myEmail}`,
			);

			return {
				success: true,
				message: 'Portfolio response and notification emails sent successfully',
			};
		} catch (error) {
			this.logger.error('Failed to send portfolio emails:', error);
			throw new EmailSendException('Portfolio email delivery failed', error);
		}
	}
}
