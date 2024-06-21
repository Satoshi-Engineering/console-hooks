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
exports.default = ({ onDebug = async (_) => undefined, onLog = async (_) => undefined, onInfo = async (_) => undefined, onWarn = async (_) => undefined, onError = async (_) => undefined, } = {}) => {
    // Save the original console functions
    const origDebug = console.debug;
    const origLog = console.log;
    const origInfo = console.info;
    const origWarn = console.warn;
    const origError = console.error;
    console.debug = async (...args) => {
        const argsWithTime = appendTime(args);
        origDebug(...argsWithTime);
        const message = convertArgsToString(argsWithTime);
        await onDebug(message);
    };
    console.log = async (...args) => {
        const argsWithTime = appendTime(args);
        origLog(...argsWithTime);
        const message = convertArgsToString(argsWithTime);
        await onLog(message);
    };
    console.info = async (...args) => {
        const argsWithTime = appendTime(args);
        origInfo(...argsWithTime);
        const message = convertArgsToString(argsWithTime);
        await onInfo(message);
    };
    console.warn = async (...args) => {
        const argsWithTime = appendTime(args);
        origWarn(...argsWithTime);
        const message = convertArgsToString(argsWithTime);
        await onWarn(message);
    };
    console.error = async (...args) => {
        const argsWithTime = appendTime(args);
        origError(...argsWithTime);
        const message = convertArgsToString(argsWithTime);
        await onError(message);
    };
};
const convertArgsToString = (args) => {
    return args
        .map((value) => {
        if (typeof value === 'string') {
            return value;
        }
        try {
            return node_util_1.default.inspect(value);
        }
        catch (error) {
            return 'console-hooks: Unable to util.inspect value, check error logs';
        }
    })
        .join('\n');
};
