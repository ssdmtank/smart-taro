import { useRef } from 'react';

/**
 * 获取最新的ref值
 * @param value
 * @returns
 */
function useLatest<T>(value: T) {
  const ref = useRef(value);
  ref.current = value;
  return ref;
}

export default useLatest;
