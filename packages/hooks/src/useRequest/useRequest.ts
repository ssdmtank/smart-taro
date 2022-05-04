import { Options, Service, Plugin } from './types';
import useRequestImplement from './useRequestImplement';

function useRequest<TData, TParams extends any[]>(
  service: Service<TData, TParams>,
  options?: Options<TData, TParams>,
  plugins?: Plugin<TData, TParams>[],
) {
  return useRequestImplement<TData, TParams>(service, options, [
    ...(plugins || []),
    // native plugins
  ]);
}

export default useRequest;
