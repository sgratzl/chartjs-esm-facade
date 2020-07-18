export interface ISplinePoint {
  x: number;
  y: number;
}

export function splineCurve(
  firstPoint: ISplinePoint & { skip?: boolean },
  middlePoint: ISplinePoint,
  afterPoint: IPoint,
  t: number
): {
  previous: ISplinePoint;
  next: ISplinePoint;
};

export interface IMonotoneSplinePoint extends ISplinePoint {
  skip: boolean;
  controlPointPreviousX?: number;
  controlPointPreviousY?: number;
  controlPointNextX?: number;
  controlPointNextY?: number;
}

export function splineCurveMonotone(points: readonly IMonotoneSplinePoint[]): void;
