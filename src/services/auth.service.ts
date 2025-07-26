


import User from "../model/user.model"; // MongoDB model import karala
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;

const refreshTokens = new Set<string>();


export const authenticateUser = async (email: string, password: string) => {
    try {

        const existingUser = await User.findOne({ email: email });

        if (!existingUser) {
            return null;
        }


        const isValidPassword = bcrypt.compareSync(password, existingUser.password);

        if (!isValidPassword) {
            return null;
        }


        const accessToken = jwt.sign({
            id: existingUser.id,
            name: existingUser.name,
            email: existingUser.email,
            role: existingUser.role
        }, JWT_SECRET, { expiresIn: "5m" });


        const refreshToken = jwt.sign({
            email: existingUser.email
        }, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });

        refreshTokens.add(refreshToken);

        return {
            accessToken,
            refreshToken,
            user: {
                id: existingUser.id,
                name: existingUser.name,
                email: existingUser.email,
                role: existingUser.role
            }
        };

    } catch (error) {
        console.error("Authentication error:", error);
        return null;
    }
};


export const refreshAccessToken = async (refreshToken: string) => {
    try {
        if (!refreshTokens.has(refreshToken)) {
            return null;
        }

        const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as any;
        const user = await User.findOne({ email: decoded.email });

        if (!user) {
            refreshTokens.delete(refreshToken);
            return null;
        }

        const newAccessToken = jwt.sign({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }, JWT_SECRET, { expiresIn: "5m" });

        return { accessToken: newAccessToken };

    } catch (error) {
        console.error("Token refresh error:", error);
        refreshTokens.delete(refreshToken);
        return null;
    }
};


export const logoutUser = (refreshToken: string) => {
    refreshTokens.delete(refreshToken);
    return { message: "Logged out successfully" };
};