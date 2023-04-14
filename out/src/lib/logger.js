"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const pino_1 = tslib_1.__importDefault(require("pino"));
const loggerName = process.env.npm_package_name || 'citizen';
const options = {
    name: loggerName,
    level: process.env.LOG_LEVEL || 'error',
};
if (process.env.NODE_ENV === 'development') {
    options.transport = {
        target: 'pino-pretty',
        options: {
            colorize: true,
        },
    };
}
const logger = (0, pino_1.default)(options);
exports.default = logger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9sb2dnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsd0RBQXdCO0FBRXhCLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLElBQUksU0FBUyxDQUFDO0FBRTdELE1BQU0sT0FBTyxHQUF1QjtJQUNsQyxJQUFJLEVBQUUsVUFBVTtJQUNoQixLQUFLLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLElBQUksT0FBTztDQUN4QyxDQUFDO0FBRUYsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxhQUFhLEVBQUU7SUFDMUMsT0FBTyxDQUFDLFNBQVMsR0FBRztRQUNsQixNQUFNLEVBQUUsYUFBYTtRQUNyQixPQUFPLEVBQUU7WUFDUCxRQUFRLEVBQUUsSUFBSTtTQUNmO0tBQ0YsQ0FBQztDQUNIO0FBRUQsTUFBTSxNQUFNLEdBQUcsSUFBQSxjQUFJLEVBQUMsT0FBTyxDQUFDLENBQUM7QUFFN0Isa0JBQWUsTUFBTSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBpbm8gZnJvbSBcInBpbm9cIjtcblxuY29uc3QgbG9nZ2VyTmFtZSA9IHByb2Nlc3MuZW52Lm5wbV9wYWNrYWdlX25hbWUgfHwgJ2NpdGl6ZW4nO1xuXG5jb25zdCBvcHRpb25zOiBwaW5vLkxvZ2dlck9wdGlvbnMgPSB7XG4gIG5hbWU6IGxvZ2dlck5hbWUsXG4gIGxldmVsOiBwcm9jZXNzLmVudi5MT0dfTEVWRUwgfHwgJ2Vycm9yJyxcbn07XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xuICBvcHRpb25zLnRyYW5zcG9ydCA9IHtcbiAgICB0YXJnZXQ6ICdwaW5vLXByZXR0eScsXG4gICAgb3B0aW9uczoge1xuICAgICAgY29sb3JpemU6IHRydWUsXG4gICAgfSxcbiAgfTtcbn1cblxuY29uc3QgbG9nZ2VyID0gcGlubyhvcHRpb25zKTtcblxuZXhwb3J0IGRlZmF1bHQgbG9nZ2VyO1xuIl19