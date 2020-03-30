import { useState, useEffect } from "react";
import stringify from "json-stringify-safe";
import CircularJSON from "circular-json";

function usePersistedState(key, initialState) {
  const [state, setState] = useState(() => {
    const storageValue = localStorage.getItem(key);

    if (storageValue) {
      // return JSON.parse(storageValue);
      return JSON.parse(storageValue);
    } else {
      return initialState;
    }
  });

  useEffect(() => {
    // localStorage.setItem(key, stringify(state));
    localStorage.setItem(key, CircularJSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

export default usePersistedState;
