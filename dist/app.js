"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// 1. Initialize the express app
const app = (0, express_1.default)();
// 2. Define Middlewares
// 2.1 Instruct to parse the request payload data to be converted to JSON format
app.use(express_1.default.json());
// 3. Define a simple HTTP GET Request
app.get('/', (req, res) => {
    res.send("Hello World!");
});
// Expert the app to use outside (in index.ts)
exports.default = app;
