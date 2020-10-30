import React, { useCallback, useState } from 'react';
export default (callback, deps = []) => {
  const [isLoading, setLoading] = useState(0);
  const func = useCallback(async (...args) => {
    setLoading((v) => v + 1);
    try {
      const result = await callback(...args);
      setLoading((v) => v - 1);
      return result;
    } catch (e) {
      setLoading((v) => v - 1);
      throw e;
    }

  }, deps);
  return [func, isLoading > 0];
};
