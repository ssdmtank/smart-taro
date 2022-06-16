import { useRef } from 'react';
import { Plugin, Timeout } from '../types';

/**
 * 请求延时，延时小于请求时间则不显示
 * @param fetchInstance
 * @returns
 */
const useLoadingDelayPlugin: Plugin<any, any[]> = (fetchInstance, { loadingDelay }) => {
  const timerRef = useRef<Timeout>();

  if (!loadingDelay) return {};

  const cancelTimeout = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  return {
    onBefore: () => {
      cancelTimeout();
      timerRef.current = setTimeout(() => {
        fetchInstance.setState({
          loading: true,
        });
      }, loadingDelay);

      return { loading: false };
    },
    onFinally: () => {
      cancelTimeout();
    },
    onCancel: () => {
      cancelTimeout();
    },
  };
};

export default useLoadingDelayPlugin;
