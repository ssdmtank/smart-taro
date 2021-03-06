import { useCallback, useState } from 'react';

/**
 * 强制刷新函数
 * @returns Fn
 */
const useUpdate = () => {
  const [, setState] = useState({});

  return useCallback(() => setState({}), []);
};

export default useUpdate;
