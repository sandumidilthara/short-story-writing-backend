import {Request, Response} from "express";
import * as emailService from "../services/email.service";

export const sendStoryConfirmationEmail = async (req: Request, res: Response) => {
    try {
        const { userEmail, userName, storyTitle, storyId } = req.body;


        if (!userEmail || !userName || !storyTitle) {
            res.status(400).json({
                error: 'User email, name, and story title are required'
            });
            return;
        }


        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userEmail)) {
            res.status(400).json({
                error: 'Invalid email format'
            });
            return;
        }


        await emailService.sendStoryCreatedConfirmation({
            userEmail,
            userName,
            storyTitle,
            storyId
        });

        res.status(200).json({
            message: 'Confirmation email sent successfully!',
            recipient: userEmail
        });

    } catch (error) {
        console.error('Error sending confirmation email:', error);
        res.status(500).json({
            error: 'Failed to send confirmation email'
        });
    }
}

export const sendWelcomeEmail = async (req: Request, res: Response) => {
    try {
        const { userEmail, userName } = req.body;

        if (!userEmail || !userName) {
            res.status(400).json({
                error: 'User email and name are required'
            });
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userEmail)) {
            res.status(400).json({
                error: 'Invalid email format'
            });
            return;
        }

        await emailService.sendWelcomeEmail({
            userEmail,
            userName
        });

        res.status(200).json({
            message: 'Welcome email sent successfully!',
            recipient: userEmail
        });

    } catch (error) {
        console.error('Error sending welcome email:', error);
        res.status(500).json({
            error: 'Failed to send welcome email'
        });
    }
}

export const sendPasswordResetEmail = async (req: Request, res: Response) => {
    try {
        const { userEmail, userName, resetToken } = req.body;

        if (!userEmail || !userName || !resetToken) {
            res.status(400).json({
                error: 'User email, name, and reset token are required'
            });
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userEmail)) {
            res.status(400).json({
                error: 'Invalid email format'
            });
            return;
        }

        await emailService.sendPasswordResetEmail({
            userEmail,
            userName,
            resetToken
        });

        res.status(200).json({
            message: 'Password reset email sent successfully!',
            recipient: userEmail
        });

    } catch (error) {
        console.error('Error sending password reset email:', error);
        res.status(500).json({
            error: 'Failed to send password reset email'
        });
    }
}

export const testEmailService = async (req: Request, res: Response) => {
    try {
        const isValid = await emailService.testEmailConfiguration();

        if (isValid) {
            res.status(200).json({
                message: 'Email service is configured correctly',
                status: 'OK'
            });
        } else {
            res.status(500).json({
                error: 'Email service configuration failed',
                status: 'FAILED'
            });
        }
    } catch (error) {
        console.error('Error testing email service:', error);
        res.status(500).json({
            error: 'Failed to test email service'
        });
    }
}