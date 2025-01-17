import React, { useState, useEffect, useRef } from "react";

const SUPER_FAST_INTERVAL = 1000;
const FAST_INTERVAL = 60000;
const SLOW_INTERVAL = 120000;
const LOW_INTERVAL = 3 * 60 * 1000;

const RefreshContext = React.createContext({ slow: 0, fast: 0, low: 0, sfast: 0 });

// Check if the tab is active in the user browser
const useIsBrowserTabActive = () => {
  const isBrowserTabActiveRef = useRef(true);

  useEffect(() => {
    const onVisibilityChange = () => {
      isBrowserTabActiveRef.current = !document.hidden;
    };

    window.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      window.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return isBrowserTabActiveRef;
};

// This context maintain 2 counters that can be used as a dependencies on other hooks to force a periodic refresh
const RefreshContextProvider = ({ children }: any) => {
  const [slow, setSlow] = useState(0);
  const [sfast, setSFast] = useState(0);
  const [fast, setFast] = useState(0);
  const [low, setLow] = useState(0);
  const isBrowserTabActiveRef = useIsBrowserTabActive();

  useEffect(() => {
    const interval = setInterval(async () => {
      if (isBrowserTabActiveRef.current) {
        setSFast((prev) => prev + 1);
      }
    }, SUPER_FAST_INTERVAL);
    return () => clearInterval(interval);
  }, [isBrowserTabActiveRef]);
  useEffect(() => {
    const interval = setInterval(async () => {
      if (isBrowserTabActiveRef.current) {
        setFast((prev) => prev + 1);
      }
    }, FAST_INTERVAL);
    return () => clearInterval(interval);
  }, [isBrowserTabActiveRef]);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (isBrowserTabActiveRef.current) {
        setSlow((prev) => prev + 1);
      }
    }, SLOW_INTERVAL);
    return () => clearInterval(interval);
  }, [isBrowserTabActiveRef]);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (isBrowserTabActiveRef.current) {
        setLow((prev) => prev + 1);
      }
    }, LOW_INTERVAL);
    return () => clearInterval(interval);
  }, [isBrowserTabActiveRef]);

  return (
    <RefreshContext.Provider value={{ slow, fast, low, sfast }}>{children}</RefreshContext.Provider>
  );
};

export { RefreshContext, RefreshContextProvider };
