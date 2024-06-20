declare const _default: ({ onDebug, onLog, onInfo, onWarn, onError, }?: {
    onDebug?: (message: string) => Promise<void>;
    onLog?: (message: string) => Promise<void>;
    onInfo?: (message: string) => Promise<void>;
    onWarn?: (message: string) => Promise<void>;
    onError?: (message: string) => Promise<void>;
}) => void;
export default _default;
