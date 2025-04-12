import * as React from "react";
import { v4 as uuid } from "uuid";

export default function useReady() {
  const isReady = React.useRef(false);
  const onReadyListeners = React.useRef<{
    [id: string]: (isReady: boolean) => void;
  }>({});

  const callReadyListeners = React.useCallback((isReady: boolean) => {
    for (const listenerId in onReadyListeners.current) {
      onReadyListeners.current[listenerId](isReady);
    }
  }, []);

  React.useEffect(() => {
    return () => callReadyListeners(false);
  }, [callReadyListeners]);

  return React.useMemo(() => {
    return {
      isReady: isReady.current,
      addReadyListener: (listener: (isReady: boolean) => void) => {
        const listenerId = uuid();
        onReadyListeners.current[listenerId] = listener;

        if (isReady.current) {
          listener(isReady.current);
        }

        return listenerId;
      },
      removeReadyListener: (listenerId: string) => {
        delete onReadyListeners.current[listenerId];
      },
      setIsReady: (newIsReady: boolean) => {
        isReady.current = newIsReady;
        callReadyListeners(newIsReady);
      },
    };
  }, [callReadyListeners]);
}
