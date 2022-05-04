import Fetch from './Fetch';
import useCreation from '../useCreation';
import useLatest from '../useLatest';
import useMemoizedFn from '../useMemoizedFn';
import useMount from '../useMount';
import useUnmount from '../useUnmount';
import useUpdate from '../useUpdate';
import { Options, Service, Plugin, Result } from './types';

function useRequestImplement<TData, TParams extends any[]>(
  service: Service<TData, TParams>,
  options: Options<TData, TParams> = {},
  plugins: Plugin<TData, TParams>[] = [],
) {
  const { manual = false, ...rest } = options;
  const fetchOptions = { manual, ...rest };
  const serviceRef = useLatest(service);
  const update = useUpdate();

  // 初始化请求实例
  const fetchInstance = useCreation(() => {
    // 给插件初始化注入参数
    const initState = plugins.map((p) => p?.onInit?.(fetchOptions)).filter(Boolean);
    return new Fetch<TData, TParams>(serviceRef, fetchOptions, update, Object.assign({}, ...initState));
  }, []);

  fetchInstance.options = fetchOptions;
  // run all plugins hooks
  fetchInstance.pluginImpls = plugins.map((p) => p(fetchInstance, fetchOptions));

  useMount(() => {
    if (!manual) {
      // useCachePlugin can set fetchInstance.state.params from cache when init
      // 请求的参数
      const params = fetchInstance.state.params || options.defaultParams || [];
      // @ts-ignore
      fetchInstance.run(...params);
    }
  });

  useUnmount(() => {
    fetchInstance.cancel();
  });

  return {
    loading: fetchInstance.state.loading,
    data: fetchInstance.state.data,
    error: fetchInstance.state.error,
    params: fetchInstance.state.params || [],
    // @ts-ignore
    run: useMemoizedFn(fetchInstance.run.bind(fetchInstance)),
    // @ts-ignore
    runAsync: useMemoizedFn(fetchInstance.runAsync.bind(fetchInstance)),
    refresh: useMemoizedFn(fetchInstance.refresh.bind(fetchInstance)),
    refreshAsync: useMemoizedFn(fetchInstance.refreshAsync.bind(fetchInstance)),
    mutate: useMemoizedFn(fetchInstance.mutate.bind(fetchInstance)),
    cancel: useMemoizedFn(fetchInstance.cancel.bind(fetchInstance)),
  } as Result<TData, TParams>;
}

export default useRequestImplement;
