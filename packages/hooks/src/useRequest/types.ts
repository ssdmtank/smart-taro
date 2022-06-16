import type { DependencyList } from 'react';
import Fetch from './Fetch';

// 请求的类型
export type Service<TData, TParams extends any[]> = (...args: TParams) => Promise<TData>;

// 配置参数类型
export interface Options<TData, TParams extends any[]> {
  manual?: boolean; // 是否需要手动触发
  onBefore?: (params: TParams) => void;
  onSuccess?: (data: TData, params: TParams) => void;
  onError?: (e: Error, params: TParams) => void;
  onFinally?: (params: TParams, data?: TData, e?: Error) => void;

  defaultParams?: TParams;

  // refreshDeps plugin
  refreshDeps?: DependencyList;
  refreshDepsAction?: () => void;

  // loadingDelay plugin
  loadingDelay?: number;

  // retry plugin
  retryCount?: number;
  retryInterval?: number;

  /** ready false 时，请求永远都不会发出 */
  ready?: boolean;
}

export interface FetchState<TData, TParams extends any[]> {
  loading: boolean; // service 是否正在执行
  params?: TParams; // 当次执行的 service 的参数数组
  data?: TData; // service 返回的数据
  error?: Error;
}

/** 插件配置类型  */
export type Plugin<TData, TParams extends any[]> = {
  (fetchInstance: Fetch<TData, TParams>, options: Options<TData, TParams>): PluginReturn<TData, TParams>;
  onInit?: (options: Options<TData, TParams>) => Partial<FetchState<TData, TParams>>;
};

/** 插件可实现的生命周期 */
export interface PluginReturn<TData, TParams extends any[]> {
  onBefore?: (params: TParams) =>
    | ({
        stopNow?: boolean;
        returnNow?: boolean;
      } & Partial<FetchState<TData, TParams>>)
    | void;
  onRequest?: (
    service: Service<TData, TParams>,
    params: TParams,
  ) => {
    servicePromise?: Promise<TData>;
  };
  onSuccess?: (data: TData, params: TParams) => void;
  onError?: (e: Error, params: TParams) => void;
  onFinally?: (params: TParams, data?: TData, e?: Error) => void;
  onCancel?: () => void;
  onMutate?: (data: TData) => void;
}

export type Subscribe = () => void;

/** useRequest返回对象类型  */
export interface Result<TData, TParams extends any[]> {
  loading: boolean;
  data?: TData;
  error?: Error;
  params: TParams | [];
  run: Fetch<TData, TParams>['run'];
  runAsync: Fetch<TData, TParams>['runAsync'];
  refresh: Fetch<TData, TParams>['refresh'];
  refreshAsync: Fetch<TData, TParams>['refreshAsync'];
  mutate: Fetch<TData, TParams>['mutate'];
  cancel: Fetch<TData, TParams>['cancel'];
}

export type Timeout = ReturnType<typeof setTimeout>;
