import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();


const initializeSendGrid = () => {
    const apiKey = process.env.SENDGRID_API_KEY;

    if (!apiKey) {

        throw new Error('SendGrid API key is required');
    }

    if (!apiKey.startsWith('SG.')) {

        throw new Error('SendGrid API key must start with "SG."');
    }

    sgMail.setApiKey(apiKey);

};


try {
    initializeSendGrid();
} catch (error) {
    console.error('SendGrid initialization failed:', error);
}

interface StoryEmailConfig {
    userEmail: string;
    userName: string;
    storyTitle: string;
    storyId?: string;
}

interface WelcomeEmailConfig {
    userEmail: string;
    userName: string;
}

interface PasswordResetConfig {
    userEmail: string;
    userName: string;
    resetToken: string;
}


const validateEnvVars = () => {
    const required = ['SENDGRID_API_KEY', 'FROM_EMAIL'];
    const missing = required.filter(key => !process.env[key]);

    if (missing.length > 0) {
        throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(process.env.FROM_EMAIL!)) {
        throw new Error('FROM_EMAIL must be a valid email address');
    }
};


export const sendStoryCreatedConfirmation = async (config: StoryEmailConfig): Promise<void> => {
    try {
        validateEnvVars();

        const msg = {
            to: config.userEmail,
            from: {
                email: process.env.FROM_EMAIL!,
                name: process.env.FROM_NAME || 'StoryApp'
            },
            subject: `🎉 Your Story "${config.storyTitle}" is Now Published!`,
            html: generateStoryConfirmationHTML(config.userName, config.storyTitle, config.storyId),
            text: generateStoryConfirmationText(config.userName, config.storyTitle, config.storyId)
        };


        const response = await sgMail.send(msg);


    } catch (error: any) {


        if (error.response) {
            console.error('SendGrid API Error:', {
                statusCode: error.response.statusCode,
                body: error.response.body
            });
        }

        throw new Error(`Failed to send confirmation email: ${error.message}`);
    }
};


export const sendWelcomeEmail = async (config: WelcomeEmailConfig): Promise<void> => {
    try {
        validateEnvVars();

        const msg = {
            to: config.userEmail,
            from: {
                email: process.env.FROM_EMAIL!,
                name: process.env.FROM_NAME || 'StoryApp'
            },
            subject: '👋 Welcome to StoryApp - Start Your Writing Journey!',
            html: generateWelcomeHTML(config.userName),
            text: generateWelcomeText(config.userName)
        };


        const response = await sgMail.send(msg);


    } catch (error: any) {


        if (error.response) {
            console.error('SendGrid API Error:', {
                statusCode: error.response.statusCode,
                body: error.response.body
            });
        }

        throw new Error(`Failed to send welcome email: ${error.message}`);
    }
};


export const sendPasswordResetEmail = async (config: PasswordResetConfig): Promise<void> => {
    try {
        validateEnvVars();

        const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password?token=${config.resetToken}`;

        const msg = {
            to: config.userEmail,
            from: {
                email: process.env.FROM_EMAIL!,
                name: process.env.FROM_NAME || 'StoryApp'
            },
            subject: '🔒 Password Reset Request - StoryApp',
            html: generatePasswordResetHTML(config.userName, config.resetToken),
            text: generatePasswordResetText(config.userName, resetUrl)
        };


        const response = await sgMail.send(msg);


    } catch (error: any) {


        if (error.response) {
            console.error('SendGrid API Error:', {
                statusCode: error.response.statusCode,
                body: error.response.body
            });
        }

        throw new Error(`Failed to send password reset email: ${error.message}`);
    }
};


export const testEmailConfiguration = async (): Promise<boolean> => {
    try {
        validateEnvVars();


        const testMsg = {
            to: process.env.FROM_EMAIL!,
            from: {
                email: process.env.FROM_EMAIL!,
                name: process.env.FROM_NAME || 'StoryApp'
            },
            subject: '✅ SendGrid Configuration Test',
            text: 'This is a test email to verify SendGrid configuration.',
            html: '<p>This is a test email to verify SendGrid configuration.</p>'
        };

        await sgMail.send(testMsg);

        return true;

    } catch (error: any) {


        if (error.response) {
            console.error('SendGrid API Error:', {
                statusCode: error.response.statusCode,
                body: error.response.body
            });
        }

        return false;
    }
};


const generateStoryConfirmationHTML = (userName: string, storyTitle: string, storyId?: string) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; background: #fff; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
            .content { padding: 30px; }
            .story-info { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .button { display: inline-block; padding: 12px 24px; background: #667eea; color: white; text-decoration: none; border-radius: 6px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🎉 Story Published!</h1>
            </div>
            <div class="content">
                <p>Dear <strong>${userName}</strong>,</p>
                <p>Congratulations! Your story has been successfully published.</p>
                <div class="story-info">
                    <h3>📖 "${storyTitle}"</h3>
                    <p><strong>Published:</strong> ${new Date().toLocaleString()}</p>
                    ${storyId ? `<p><strong>Story ID:</strong> ${storyId}</p>` : ''}
                </div>
                <p>Your story is now live and available for readers worldwide!</p>
                <p style="text-align: center;">
                    <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}" class="button">View Your Story</a>
                </p>
                <p>Happy writing!<br><strong>The StoryApp Team</strong></p>
            </div>
        </div>
    </body>
    </html>
    `;
};

const generateWelcomeHTML = (userName: string) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; background: #fff; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
            .content { padding: 30px; }
            .features { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .button { display: inline-block; padding: 12px 24px; background: #667eea; color: white; text-decoration: none; border-radius: 6px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>👋 Welcome to StoryApp!</h1>
            </div>
            <div class="content">
                <p>Hello <strong>${userName}</strong>,</p>
                <p>Welcome to StoryApp! We're thrilled to have you join our community.</p>
                <div class="features">
                    <h3>🚀 What you can do:</h3>
                    <ul>
                        <li>📝 Write and publish stories</li>
                        <li>📚 Discover amazing stories</li>
                        <li>🏷️ Organize by categories</li>
                        <li>💬 Connect with writers</li>
                    </ul>
                </div>
                <p style="text-align: center;">
                    <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/write" class="button">Start Writing</a>
                </p>
                <p>Happy writing!<br><strong>The StoryApp Team</strong></p>
            </div>
        </div>
    </body>
    </html>
    `;
};

const generatePasswordResetHTML = (userName: string, resetToken: string) => {
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password?token=${resetToken}`;

    return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; background: #fff; }
            .header { background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%); color: white; padding: 30px; text-align: center; }
            .content { padding: 30px; }
            .warning { background: #fff3cd; padding: 15px; border-radius: 6px; margin: 20px 0; color: #856404; }
            .button { display: inline-block; padding: 12px 24px; background: #e74c3c; color: white; text-decoration: none; border-radius: 6px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🔒 Password Reset</h1>
            </div>
            <div class="content">
                <p>Hello <strong>${userName}</strong>,</p>
                <p>We received a request to reset your password.</p>
                <p style="text-align: center;">
                    <a href="${resetUrl}" class="button">Reset Password</a>
                </p>
                <div class="warning">
                    <strong>⚠️ Important:</strong> This link expires in 1 hour. If you didn't request this, ignore this email.
                </div>
                <p>Stay secure!<br><strong>The StoryApp Team</strong></p>
            </div>
        </div>
    </body>
    </html>
    `;
};


const generateStoryConfirmationText = (userName: string, storyTitle: string, storyId?: string) => {
    return `Dear ${userName},

Congratulations! Your story "${storyTitle}" has been successfully published.

Story Details:
- Title: ${storyTitle}
- Published: ${new Date().toLocaleString()}
${storyId ? `- Story ID: ${storyId}` : ''}

Your story is now live and available for readers worldwide!

Visit: ${process.env.FRONTEND_URL || 'http://localhost:5173'}

Happy writing!
The StoryApp Team`;
};

const generateWelcomeText = (userName: string) => {
    return `Hello ${userName},

Welcome to StoryApp! We're thrilled to have you join our community.

What you can do:
- Write and publish stories
- Discover amazing stories
- Organize by categories
- Connect with writers

Start writing: ${process.env.FRONTEND_URL || 'http://localhost:5173'}/write

Happy writing!
The StoryApp Team`;
};

const generatePasswordResetText = (userName: string, resetUrl: string) => {
    return `Hello ${userName},

We received a request to reset your password.

Reset your password: ${resetUrl}

Important: This link expires in 1 hour. If you didn't request this, ignore this email.

Stay secure!
The StoryApp Team`;
};