import type { DependencyList } from 'react';

export default function depsAreSame(oldDeps: DependencyList, deps: DependencyList): boolean {
  if (oldDeps === deps) return true;
  for (let i = 0; i < oldDeps.length; i++) {
    // 优于===比较，不强制转换
    if (!Object.is(oldDeps[i], deps[i])) return false;
  }
  return true;
}
