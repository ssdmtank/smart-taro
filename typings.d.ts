declare module '*.css';
declare module '*.less';

declare module '*.png';

// mock typings
declare module 'taro-seed-hooks';
declare module '@tarojs/runtime';
declare module 'mockjs';
declare module 'lodash.throttle';

declare var BUILD_MODE: string | undefined;

declare var wx: any;

declare type TRecord<T = unknown> = {
  [_: string | number]: T;
};
