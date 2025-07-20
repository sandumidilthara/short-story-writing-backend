"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
// 1. Define the application port
const port = 3000;
// 2. Instructs the express app to listen on port 3000
app_1.default.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
