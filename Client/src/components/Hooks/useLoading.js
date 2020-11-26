import { useCallback, useState } from 'react';

export default (callback) => {
  const [isLoading, setLoading] = useState(0);
  // const func = useCallback(
  //   async (...args) => {
  //     setLoading((v) => v + 1);
  //     try {
  //       const result = await callback(...args);
  //       setLoading((v) => v - 1);
  //       return result;
  //     } catch (e) {
  //       setLoading((v) => v - 1);
  //       throw e;
  //     }
  //   },
  //   [callback]
  // );
  const func = (...args) => {
    setLoading((v) => v + 1);
    try {
      const result = callback(...args);
      if (result instanceof Promise) {
        result.then(
          () => {
            setLoading((v) => v - 1);
          },
          (e) => {
            setLoading((v) => v - 1);
            throw e;
          }
        );
      } else {
        setLoading((v) => v - 1);
      }
      return result;
    } catch (e) {
      setLoading((v) => v - 1);
      throw e;
    }
  };
  return [func, isLoading > 0];
};
