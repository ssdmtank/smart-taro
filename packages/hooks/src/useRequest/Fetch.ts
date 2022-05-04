import type { MutableRefObject } from 'react';
import { FetchState, Options, PluginReturn, Service, Subscribe } from './types';

export default class Fetch<TData, TParams extends any[]> {
  pluginImpls: PluginReturn<TData, TParams>[] = [];

  // 用于判断是否取消请求
  count: number = 0;

  state: FetchState<TData, TParams> = {
    loading: false,
    params: undefined,
    data: undefined,
    error: undefined,
  };

  constructor(
    public serviceRef: MutableRefObject<Service<TData, TParams>>,
    public options: Options<TData, TParams>,
    public subscribe: Subscribe,
    public initState: Partial<FetchState<TData, TParams>> = {},
  ) {
    this.state = {
      ...this.state,
      loading: !options.manual, // 自动触发则开启load
      ...initState,
    };
  }

  private setState(s: Partial<FetchState<TData, TParams>> = {}) {
    this.state = { ...this.state, ...s };
    // 强制刷新
    this.subscribe();
  }

  /**
   * 执行传入插件的所有方法
   * @param event
   * @param rest
   * @returns
   */
  private runPluginHandler(event: keyof PluginReturn<TData, TParams>, ...rest: any[]) {
    // @ts-ignore
    const r = this.pluginImpls.map((i) => i[event]?.(...rest)).filter(Boolean);
    return Object.assign({}, ...r);
  }

  async runAsync(...params: TParams): Promise<TData> {
    this.count += 1;
    const currentCount = this.count;

    const { stopNow = false, returnNow = false, ...state } = this.runPluginHandler('onBefore', params);

    // 中断请求
    if (stopNow) return new Promise(() => {});

    this.setState({ loading: true, params, ...state });

    if (returnNow) return Promise.resolve(state.data);

    this.options.onBefore?.(params);

    try {
      let { servicePromise } = this.runPluginHandler('onRequest', this.serviceRef.current, params);

      if (!servicePromise) servicePromise = this.serviceRef.current(...params);

      const res = await servicePromise;

      // 取消旧的请求来保证请求顺序
      if (currentCount !== this.count) return new Promise(() => {});

      // 执行请求结束
      this.setState({ data: res, error: undefined, loading: false });

      // onSuccess
      this.options.onSuccess?.(res, params);
      this.runPluginHandler('onSuccess', res, params);

      // onFinally
      this.options.onFinally?.(params, res, undefined);
      if (currentCount === this.count) this.runPluginHandler('onFinally', params, res, undefined);

      return res;
    } catch (error: any) {
      // prevent run.then when request is canceled
      if (currentCount !== this.count) return new Promise(() => {});

      this.setState({ error, loading: false });

      // onError
      this.options.onError?.(error, params);
      this.runPluginHandler('onError', error, params);

      // onFinally
      this.options.onFinally?.(params, undefined, error);
      if (currentCount === this.count) this.runPluginHandler('onFinally', params, undefined, error);

      throw error;
    }
  }

  /** 如自动执行(manual:false)会走此方法 */
  run(...params: TParams) {
    this.runAsync(...params).catch((error) => {
      if (!this.options.onError) console.error(error);
    });
  }

  refresh() {
    // @ts-ignore
    this.run(...(this.state.params || []));
  }

  refreshAsync() {
    // @ts-ignore
    this.runAsync(...(this.state.params || []));
  }

  /** 直接修改 data */
  mutate(data?: TData | ((oldData?: TData) => TData | undefined)) {
    let targetData: TData | undefined;
    // @ts-ignore
    if (typeof data === 'function') targetData = data(this.state.data);
    else targetData = data;

    this.runPluginHandler('onMutate', targetData);

    this.setState({ data: targetData });
  }

  /** 取消请求
   * 1、组件卸载时，取消正在进行的请求
   * 2、竞态取消，当上一次请求还没返回时，又发起了下一次请求，则会取消上一次请求
   */
  cancel() {
    this.count += 1;
    this.setState({ loading: false });
    this.runPluginHandler('onCancel');
  }
}
