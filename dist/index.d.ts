export declare const isGesturable: (target: any) => boolean;
export declare const scope: (target: any) => void;
export declare const descope: (target?: any) => void;
export declare const descopeAll: () => void;
export declare const gesture: (box: EventTarget, handle?: any) => {
    destroy: () => void;
    cancel: () => void;
};
