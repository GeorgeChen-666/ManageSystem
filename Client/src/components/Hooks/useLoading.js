import React, { useCallback, useState } from 'react';
export default (callback, deps = []) => {
  const [isLoading, setLoading] = useState(0);
  const func = useCallback(async (...args) => {
    setLoading((v) => v + 1);
    const result = await callback(...args);
    setLoading((v) => v - 1);
    return result;
  }, deps);
  return [func, isLoading > 0];
};
