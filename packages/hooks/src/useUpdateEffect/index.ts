import { useEffect, useRef } from 'react';
type effectHookType = typeof useEffect;

/** 忽略首次执行的useEffect */
export const useUpdateEffect: effectHookType = (effect, deps) => {
  const isMounted = useRef(false);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (!isMounted.current) isMounted.current = true;
    else return effect();
  }, deps);
};
