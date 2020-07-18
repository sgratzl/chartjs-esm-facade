import { IFontSpec } from './canvas';

export interface IFullFontSpec {
  color: string;
  family: string;
  lineHeight: number;
  lineWidth: number;
  size: number;
  style: string;
  weight: string | null;
  strokeStyle: string | null;
  string: string;
}

export function toFont(options: IFontOptions): IFullFontSpec;

export function toLineHeight(value: string, size: number): number;
export function toPadding(
  value: number | { top: number; left: number; right: number; bottom: number }
): { top: number; left: number; right: number; bottom: number; width: number; height: number };

export function resolve<T, C>(
  inputs: readonly (undefined | T | ((c: C) => T) | T[]),
  context: C,
  index: number,
  info?: { cacheable?: boolean }
): T | undefined;
