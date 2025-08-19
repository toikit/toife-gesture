export declare const isGesturable: (e: any, last?: boolean) => any;
export declare const lock: (target: any) => void;
export declare const unlock: (target?: any) => void;
export declare const unlockAll: () => void;
export declare const gesture: (box: EventTarget, handle?: any) => {
    destroy: () => void;
    cancel: () => void;
};
