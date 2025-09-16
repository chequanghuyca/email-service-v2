export interface MailWelcomeData {
	name: string;
	loginUrl: string;
}

const bodyMailWelcome = `
	<!doctype html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Welcome to TransMaster</title>
            <!--[if mso]>
                <noscript>
                    <xml>
                        <o:OfficeDocumentSettings>
                            <o:PixelsPerInch>96</o:PixelsPerInch>
                        </o:OfficeDocumentSettings>
                    </xml>
                </noscript>
            <![endif]-->
        </head>
        <body
            style="
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            "
        >
            <table
                role="presentation"
                style="width: 100%; border-collapse: collapse; background: white; overflow: hidden"
            >
                <!-- Header -->
                <tr>
                    <td
                        class="header-padding"
                        style="
                            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                            color: white;
                            padding: 60px 50px;
                            text-align: center;
                        "
                    >
                        <table role="presentation" style="width: 100%; border-collapse: collapse">
                            <tr>
                                <td align="center">
                                    <table
                                        role="presentation"
                                        style="margin: 0 auto 25px auto; border-collapse: collapse"
                                    >
                                        <tr>
                                            <td
                                                align="center"
                                                class="mobile-icon-header tablet-icon-header"
                                                style="
                                                    width: 100px;
                                                    height: 100px;
                                                    background: rgba(255, 255, 255, 0.2);
                                                    border-radius: 50%;
                                                    text-align: center;
                                                    vertical-align: middle;
                                                "
                                            >
                                                <span
                                                    style="
                                                        font-size: 42px;
                                                        line-height: 100px;
                                                        display: inline-block;
                                                        vertical-align: middle;
                                                    "
                                                    >🎉</span
                                                >
                                            </td>
                                        </tr>
                                    </table>
                                    <h1
                                        class="mobile-title"
                                        style="
                                            margin: 0 0 15px 0;
                                            font-size: 36px;
                                            font-weight: 300;
                                            letter-spacing: 1px;
                                            line-height: 1.2;
                                        "
                                    >
                                        Welcome to TransMaster!
                                    </h1>
                                    <p
                                        class="mobile-subtitle"
                                        style="margin: 0; font-size: 20px; opacity: 0.9; line-height: 1.4"
                                    >
                                        Hello {{name}}, let's start your learning journey
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>

                <!-- Content -->
                <tr>
                    <td class="container-padding" style="padding: 60px 50px">
                        <table role="presentation" style="width: 100%; border-collapse: collapse">
                            <tr>
                                <td>
                                    <p
                                        class="mobile-greeting"
                                        style="
                                            font-size: 22px;
                                            color: #333;
                                            margin: 0 0 35px 0;
                                            line-height: 1.6;
                                        "
                                    >
                                        <strong>Dear {{name}},</strong>
                                    </p>

                                    <p
                                        class="mobile-text"
                                        style="
                                            font-size: 18px;
                                            color: #555;
                                            line-height: 1.7;
                                            margin: 0 0 35px 0;
                                        "
                                    >
                                        Thank you for joining our learning community! We're excited to welcome
                                        you to our advanced language learning platform where you can enhance
                                        your translation skills and connect with fellow learners.
                                    </p>

                                    <!-- Features Section -->
                                    <table
                                        role="presentation"
                                        style="
                                            width: 100%;
                                            border-collapse: collapse;
                                            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                                            border-radius: 15px;
                                            margin: 40px 0;
                                            border-left: 5px solid #667eea;
                                        "
                                    >
                                        <tr>
                                            <td class="section-padding" style="padding: 35px">
                                                <table
                                                    role="presentation"
                                                    style="width: 100%; border-collapse: collapse"
                                                >
                                                    <tr>
                                                        <td>
                                                            <h3
                                                                style="color: #667eea; margin: 0 0 20px 0; font-size: 24px"
                                                            >
                                                                <table
                                                                    role="presentation"
                                                                    style="border-collapse: collapse"
                                                                >
                                                                    <tr>
                                                                        <td
                                                                            style="
                                                                                width: 35px;
                                                                                vertical-align: middle;
                                                                                padding-right: 12px;
                                                                            "
                                                                        >
                                                                            <span style="font-size: 26px; line-height: 1"
                                                                                >🚀</span
                                                                            >
                                                                        </td>
                                                                        <td style="vertical-align: middle">
                                                                            <span
                                                                                class="mobile-text"
                                                                                style="font-size: 24px; font-weight: 600"
                                                                                >What you can do:</span
                                                                            >
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </h3>
                                                            <div
                                                                class="mobile-text"
                                                                style="
                                                                    color: #555;
                                                                    margin: 0;
                                                                    line-height: 1.7;
                                                                    font-size: 17px;
                                                                "
                                                            >
                                                                <ul style="margin: 0; padding-left: 20px">
                                                                    <li style="margin-bottom: 8px">
                                                                        Participate in exciting translation challenges
                                                                    </li>
                                                                    <li style="margin-bottom: 8px">
                                                                        Learn by topics and difficulty levels
                                                                    </li>
                                                                    <li style="margin-bottom: 8px">
                                                                        Track your learning progress
                                                                    </li>
                                                                    <li style="margin-bottom: 8px">
                                                                        Receive detailed feedback on your translations
                                                                    </li>
                                                                    <li style="margin-bottom: 0">
                                                                        Join our vibrant learning community
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>

                                    <p
                                        style="
                                            font-size: 18px;
                                            color: #555;
                                            line-height: 1.7;
                                            margin: 0 0 40px 0;
                                        "
                                    >
                                        Start your learning journey today! We believe you'll have an amazing
                                        learning experience and achieve great progress in your language skills.
                                    </p>

                                    <p
                                        style="
                                            font-size: 18px;
                                            color: #555;
                                            line-height: 1.7;
                                            margin: 0 0 45px 0;
                                        "
                                    >
                                        If you have any questions, don't hesitate to contact us. We're always
                                        here to support you on your learning journey!
                                    </p>

                                    <!-- Call to Action -->
                                    <table role="presentation" style="width: 100%; border-collapse: collapse">
                                        <tr>
                                            <td align="center" style="padding: 25px 0">
                                                <a
                                                    href="{{loginUrl}}"
                                                    class="mobile-button"
                                                    style="
                                                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                                                        color: white;
                                                        padding: 20px 45px;
                                                        text-decoration: none;
                                                        border-radius: 35px;
                                                        font-weight: 600;
                                                        display: inline-block;
                                                        box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
                                                        font-size: 17px;
                                                        letter-spacing: 0.5px;
                                                    "
                                                    >Start Learning Now</a
                                                >
                                            </td>
                                        </tr>
                                    </table>

                                    <hr style="border: none; border-top: 1px solid #e9ecef; margin: 55px 0" />

                                    <!-- Footer -->
                                    <table role="presentation" style="width: 100%; border-collapse: collapse">
                                        <tr>
                                            <td align="center">
                                                <p
                                                    style="
                                                        font-size: 17px;
                                                        color: #777;
                                                        margin: 0 0 18px 0;
                                                        line-height: 1.6;
                                                    "
                                                >
                                                    Best regards,<br />
                                                    <strong style="color: #667eea; font-size: 19px"
                                                        >The TransMaster Team</strong
                                                    >
                                                </p>
                                                <p
                                                    style="font-size: 15px; color: #999; margin: 0; line-height: 1.5"
                                                >
                                                    This is an automated welcome email. Feel free to reply if you have
                                                    any questions.
                                                </p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>

            <!-- Mobile & Responsive Styles -->
            <style>
                /* Reset for email clients */
                table {
                    border-collapse: collapse !important;
                }
                img {
                    border: 0;
                    height: auto;
                    line-height: 100%;
                    outline: none;
                    text-decoration: none;
                }

                /* Desktop optimizations */
                @media only screen and (min-width: 768px) {
                    .desktop-width {
                        max-width: 900px !important;
                    }
                }

                /* Tablet styles */
                @media only screen and (max-width: 768px) and (min-width: 481px) {
                    .container-padding {
                        padding: 40px 35px !important;
                    }
                    .header-padding {
                        padding: 45px 35px !important;
                    }
                    .section-padding {
                        padding: 25px !important;
                    }
                    .tablet-icon-header {
                        width: 85px !important;
                        height: 85px !important;
                    }
                    .tablet-icon-header span {
                        font-size: 38px !important;
                        line-height: 85px !important;
                    }
                }

                /* Mobile styles - More specific targeting */
                @media only screen and (max-width: 480px) {
                    .container-padding {
                        padding: 25px 20px !important;
                    }
                    .header-padding {
                        padding: 35px 20px !important;
                    }
                    .section-padding {
                        padding: 20px !important;
                    }
                    .mobile-title {
                        font-size: 26px !important;
                        line-height: 1.2 !important;
                    }
                    .mobile-subtitle {
                        font-size: 16px !important;
                        line-height: 1.4 !important;
                    }
                    .mobile-text {
                        font-size: 16px !important;
                        line-height: 1.6 !important;
                    }
                    .mobile-greeting {
                        font-size: 18px !important;
                        line-height: 1.5 !important;
                    }
                    .mobile-icon-header {
                        width: 75px !important;
                        height: 75px !important;
                        min-width: 75px !important;
                        min-height: 75px !important;
                    }
                    .mobile-icon-header span {
                        font-size: 32px !important;
                        line-height: 75px !important;
                        display: inline-block !important;
                        vertical-align: middle !important;
                    }
                    .mobile-button {
                        padding: 16px 30px !important;
                        font-size: 15px !important;
                        display: inline-block !important;
                    }
                }

                /* Extra small mobile */
                @media only screen and (max-width: 360px) {
                    .mobile-icon-header {
                        width: 70px !important;
                        height: 70px !important;
                        min-width: 70px !important;
                        min-height: 70px !important;
                    }
                    .mobile-icon-header span {
                        font-size: 28px !important;
                        line-height: 70px !important;
                    }
                }
            </style>
        </body>
    </html>
`;

const subjectMailWelcome = 'Welcome to TransMaster!';

export function getBodyMailWelcome(data: MailWelcomeData): string {
	let result = bodyMailWelcome;

	result = result.replace(/{{name}}/g, data.name);
	result = result.replace(/{{loginUrl}}/g, data.loginUrl);

	return result;
}

export function getSubjectMailWelcome(): string {
	return subjectMailWelcome;
}
