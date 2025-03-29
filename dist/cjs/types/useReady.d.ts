export default function useReady(): {
    isReady: boolean;
    addReadyListener: (listener: (isReady: boolean) => void) => string;
    removeReadyListener: (listenerId: string) => void;
    setIsReady: (newIsReady: boolean) => void;
};
