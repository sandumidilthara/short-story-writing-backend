import {Router} from "express";
import {
    sendStoryConfirmationEmail,
    sendWelcomeEmail,
    sendPasswordResetEmail,
    testEmailService
} from "../controllers/email.controller";
import {authenticateToken} from "../middleware/auth.middleware";

const emailRoutes: Router = Router();


emailRoutes.post("/story-confirmation", authenticateToken, sendStoryConfirmationEmail);


emailRoutes.post("/welcome", sendWelcomeEmail);


emailRoutes.post("/password-reset", sendPasswordResetEmail);

emailRoutes.get("/test", authenticateToken, testEmailService);

export default emailRoutes;