import type { DependencyList } from 'react';
import { useRef } from 'react';
import depsAreSame from '../utils/depsAreSame';

/**
 * 避免useRef构建函数重新实例化，比useMemo缓存更新保证不被重渲染
 * @param factory
 * @param deps
 * @returns
 */
export default function useCreation<T>(factory: () => T, deps: DependencyList) {
  const { current } = useRef({
    deps,
    obj: undefined as undefined | T,
    initialized: false,
  });
  if (current.initialized === false || !depsAreSame(current.deps, deps)) {
    current.deps = deps;
    current.obj = factory();
    current.initialized = true;
  }
  return current.obj as T;
}
