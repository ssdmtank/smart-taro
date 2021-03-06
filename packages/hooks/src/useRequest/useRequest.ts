import { Options, Service, Plugin } from './types';
import useRequestImplement from './useRequestImplement';
import useAutoRunPlugin from './plugins/useAutoRunPlugin';
import useRetryPlugin from './plugins/useRetryPlugin';
import useLoadingDelayPlugin from './plugins/useLoadingDelayPlugin';

function useRequest<TData, TParams extends any[]>(
  service: Service<TData, TParams>,
  options?: Options<TData, TParams>,
  plugins?: Plugin<TData, TParams>[],
) {
  return useRequestImplement<TData, TParams>(service, options, [
    ...(plugins || []),
    // native plugins
    useAutoRunPlugin,
    useRetryPlugin,
    useLoadingDelayPlugin,
  ] as Plugin<TData, TParams>[]);
}

export default useRequest;
