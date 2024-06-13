"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
const node_util_1 = __importDefault(require("node:util"));
function appendTime(args) {
    const timezoneOffset = (new Date()).getTimezoneOffset() * 60000;
    const time = (new Date(Date.now() - timezoneOffset)).toISOString().replace(/T/, ' ').replace(/\..+/, '');
    if (typeof args[0] === 'string') {
        return [`[${time}] ${args[0]}`, ...args.slice(1)];
    }
    return [`[${time}]`, ...args];
}
exports.default = ({ onErrorMessage = async (_) => undefined } = {}) => {
    // Save the original console functions
    const origDebug = console.debug;
    const origLog = console.log;
    const origInfo = console.info;
    const origWarn = console.warn;
    const origError = console.error;
    console.debug = (...args) => {
        const argsWithTime = appendTime(args);
        origDebug(...argsWithTime);
    };
    console.log = (...args) => {
        const argsWithTime = appendTime(args);
        origLog(...argsWithTime);
    };
    console.info = (...args) => {
        const argsWithTime = appendTime(args);
        origInfo(...argsWithTime);
    };
    console.warn = (...args) => {
        const argsWithTime = appendTime(args);
        origWarn(...argsWithTime);
    };
    console.error = async (...args) => {
        const argsWithTime = appendTime(args);
        origError(...argsWithTime);
        // Send Error Message to telegram
        const message = args
            .map((value) => {
            if (typeof value === 'string') {
                return value;
            }
            try {
                return node_util_1.default.inspect(value);
            }
            catch (error) {
                return 'consoleOverride: Unable to util.inspect value, check error logs';
            }
        })
            .join('\n');
        await onErrorMessage(message);
    };
};
