export declare const isGesturable: (e: any) => any;
export declare const lock: (target: any) => void;
export declare const unlock: () => void;
export declare const gesture: (box: EventTarget, handle?: any) => {
    destroy: () => void;
    cancel: () => void;
};
