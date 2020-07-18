export function noop(): any;

export function uid(): number;
export function isNullOrUndef(value?: any): boolean;
export function isArray(value: any): boolean;
export function isObject(value: any): boolean;
export function isFinite(value: any): boolean;
export function valueOrDefault<T>(value: T | undefined, defaultValue: T): T;
export function callback<T extends (this: TA, ...args: any[]) => R, TA, R>(
  fn: T | undefined,
  args: any[],
  thisArg: TA
): R | undefined;
export function each<T, TA>(loopable: T[], fn: (this: TA, v: T, i: number) => void, reverse: boolean): void;
export function each<T, TA>(
  loopable: { [key: string]: T },
  fn: (this: TA, v: T, k: string) => void,
  reverse: boolean
): void;
export function clone<T>(source: T): T;

export function merge<T>(target: T, source: [], options?: any): T;
export function merge<T, S1>(target: T, source: [S1], options?: any): T & S1;
export function merge<T, S1, S2>(target: T, source: [S1, S2], options?: any): T & S1 & S2;
export function merge<T, S1, S2, S3>(target: T, source: [S1, S2, S3], options?: any): T & S1 & S2 & S3;
export function merge<T, S1, S2, S3, S4>(target: T, source: [S1, S2, S3, S4], options?: any): T & S1 & S2 & S3 & S4;
export function merge<T>(target: T, source: any[], options?: any): any;

export function mergeIf<T>(target: T, source: []): T;
export function mergeIf<T, S1>(target: T, source: [S1]): T & S1;
export function mergeIf<T, S1, S2>(target: T, source: [S1, S2]): T & S1 & S2;
export function mergeIf<T, S1, S2, S3>(target: T, source: [S1, S2, S3]): T & S1 & S2 & S3;
export function mergeIf<T, S1, S2, S3, S4>(target: T, source: [S1, S2, S3, S4]): T & S1 & S2 & S3 & S4;
export function mergeIf<T>(target: T, source: any[]): any;

export function resolveObjectKey(obj: any, key: string[]): any;
