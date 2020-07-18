export function clear(chart: { ctx: CanvasRenderingContext2D }): void;

export function clipArea(
  ctx: CanvasRenderingContext2D,
  area: { left: number; top: number; right: number; bottom: number }
): void;

export function unclipArea(ctx: CanvasRenderingContext2D): void;

export declare type PointStyle =
  | 'circle'
  | 'cross'
  | 'crossRot'
  | 'dash'
  | 'line'
  | 'rect'
  | 'rectRounded'
  | 'rectRot'
  | 'star'
  | 'triangle'
  | HTMLImageElement
  | HTMLCanvasElement;

export interface IPointOptions {
  pointStyle: PointStyle;
  rotation: number;
  radius: number;
  borderWidth: number;
}
export function drawPoint(ctx: CanvasRenderingContext2D, options: IPointOptions, x: number, y: number): void;

export interface IFontSpec {
  size: number;
  family: string;
  style: string;
  weight: string;
}
export function toFontString(font: IFontSpec): string;
