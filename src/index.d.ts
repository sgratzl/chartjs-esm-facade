/// <reference types="chart.js" />

export class TypedRegistry<T> {
  register(item: IRegistryElement): string;
  get(id: string): T | undefined;
  unregister(item: IRegistryElement): void;
}

declare type IRegisterElementLike = IRegistryElement | IRegistryElement[] | { [key: string]: IRegistryElement };

export class Registry {
  readonly controllers: TypedRegistry<DatasetController>;
  readonly elements: TypedRegistry<Element>;
  readonly plugins: TypedRegistry<IPlugin>;
  readonly scales: TypedRegistry<Scale>;

  add(...args: IRegisterElementLike[]): void;
  remove(...args: IRegisterElementLike[]): void;
  addControllers(...args: IRegisterElementLike[]): void;
  addElements(...args: IRegisterElementLike[]): void;
  addPlugins(...args: IRegisterElementLike[]): void;
  addScales(...args: IRegisterElementLike[]): void;

  getController(id: string): DatasetController | undefined;
  getElement(id: string): Element | undefined;
  getPlugin(id: string): IPlugin | undefined;
  getScale(id: string): Scale | undefined;
}

export class Animator {
  listen(chart: Chart, event: Event, cb: any): void;
  add(chart: Chart, items: any): void;
  has(chart: Chart): boolean;
  start(chart: Chart): void;
  running(chart: Chart): boolean;
  stop(chart: Chart): void;
  remove(chart: Chart): boolean;
}

export class Animation {
  constructor(cfg: any, target: any, prop: string, to?: any);
  active(): boolean;
  update(cfg: any, to: any, date: number): void;
  cancel(): void;
  tick(date: number): void;
}

export class Animations {
  constructor(chart: Chart, animations: {});
  configure(animations: {}): void;
  update(target: any, values: any): undefined | boolean;
}

export declare type UpdateMode = 'resize' | 'reset' | 'none' | 'hide' | 'show' | undefined;

export interface DatasetController {
  readonly chart: Chart;
  readonly index: number;

  linkScales(): void;
  getAllParsedValues(scale: Scale): any[];
  getLabelAndValue(index: number): { label: string; value: string };
  updateElements(elements: Element[], start: number, mode: UpdateMode): void;
  update(mode: UpdateMode): void;
  updateIndex(datasetIndex: number): void;
  getMaxOverflow(): boolean;
  draw(): void;
  reset(): void;
  getDataset(): Chart.ChartData;
  getMeta(): IChartMeta;
  getScaleForId(scaleID: string): Scale | undefined;
  configure(): void;
  initialize(): void;
  addElements(): void;
  buildOrUpdateElements(): void;

  getStyle(index: number, active: boolean): any;
  resolveDatasetElementOptions(active: boolean): any;
  resolveDataElementOptions(index: number, mode: UpdateMode): any;
  getSharedOptions(mode: UpdateMode, el: Element, options: any): undefined | { target: any; options: any };
  includeOptions(mode: UpdateMode, sharedOptions: any): boolean;
  updateElement(element, index, properties, mode: UpdateMode): void;
  updateSharedOptions(sharedOptions: any, mode: UpdateMode): void;
  removeHoverStyle(element: Element, datasetIndex: number, index: number): void;
  setHoverStyle(element: Element, datasetIndex: number, index: number): void;

  parse(start: number, count: number): void;
  parsePrimitiveData(meta, data, start: number, count: number): any[];
  parseArrayData(meta, data, start: number, count: number): any[];
  parseObjectData(meta, data, start: number, count: number): any[];
  getParsed(index: number): any;
  applyStack(scale: Scale, parsed: any[]): number;
  updateRangeFromParsed(range: { min: number; max: number }, scale: Scale, parsed: any[], stack: boolean): void;
  getMinMax(scale: Scale, canStack?: boolean): { min: number; max: number };
}
export const DatasetController: {
  prototype: DatasetController;
  new (chart: Chart, datasetIndex: number): DatasetController;
};

export interface BarController extends DatasetController {}
export const BarController: IRegistryElement & {
  prototype: BarController;
  new (chart: Chart, datasetIndex: number): BarController;
};

export interface BubbleController extends DatasetController {}
export const BubbleController: IRegistryElement & {
  prototype: BubbleController;
  new (chart: Chart, datasetIndex: number): BubbleController;
};

export interface DoughnutController extends DatasetController {
  readonly innerRadius: number;
  readonly outerRadius: number;
  readonly offsetX: number;
  readonly offsetY: number;

  getRingIndex(datasetIndex): number;
  calculateTotal(): number;
  calculateCircumference(value: number): number;
}
export const DoughnutController: IRegistryElement & {
  prototype: DoughnutController;
  new (chart: Chart, datasetIndex: number): DoughnutController;
};

export interface LineController extends DatasetController {}
export const LineController: IRegistryElement & {
  prototype: LineController;
  new (chart: Chart, datasetIndex: number): LineController;
};
export interface PolarAreaController extends DoughnutController {
  countVisibleElements(): number;
}
export const PolarAreaController: IRegistryElement & {
  prototype: PolarAreaController;
  new (chart: Chart, datasetIndex: number): PolarAreaController;
};

export interface PieController extends DoughnutController {}
export const PieController: IRegistryElement & {
  prototype: PieController;
  new (chart: Chart, datasetIndex: number): PieController;
};

export interface RadarController extends DatasetController {}
export const RadarController: IRegistryElement & {
  prototype: RadarController;
  new (chart: Chart, datasetIndex: number): RadarController;
};
export interface ScatterController extends LineController {}
export const ScatterController: IRegistryElement & {
  prototype: ScatterController;
  new (chart: Chart, datasetIndex: number): ScatterController;
};

export class DateAdapter {
  new(options: any): DateAdapter;
  readonly options: any;
  formats(): any;
  parse(value: any, format: any): any;
  format(timestamp: any, format: any): any;
  add(timestamp: any, amount: any, unit: any): any;
  diff(a: any, b: any, unit: any): any;
  startOf(timestamp: any, unit: any, weekday: any): any;
  endOf(timestamp: any, unit: any): any;
  static override(members: any): void;
}

export const _adapters: {
  _data: DateAdapter;
};

export interface InteractionElement {
  element: Element;
  datasetIndex: number;
  index: number;
}
export declare type InteractionMode = (
  chart: Chart,
  e: any,
  options: any,
  useFinalPosition?: boolean
) => InteractionElement[];
export const Interaction: {
  modes: {
    index: InteractionMode;
    dataset: InteractionMode;
    point: InteractionMode;
    x: InteractionMode;
    y: InteractionMode;
  };
};
export const layouts: any;

export class BasePlatform {
  acquireContext(canvas: HTMLCanvasElement, options?: CanvasRenderingContext2DSettings): void;
  releaseContext(context: CanvasRenderingContext2D): boolean;
  addEventListener(chart: Chart, type: string, listener: any): void;
  removeEventListener(chart: Chart, type: string, listener: any): void;
  getDevicePixelRatio(): number;
  isAttached(canvas: HTMLCanvasElement): boolean;
}

export class BasicPlatform extends BasePlatform {}
export class DomPlatform extends BasePlatform {}

export class PluginService {
  notify(chart: Chart, hook: string, args: any[]): boolean;
  invalidate(): void;
}

export declare class Chart {
  constructor(
    item:
      | string
      | CanvasRenderingContext2D
      | HTMLCanvasElement
      | ArrayLike<CanvasRenderingContext2D | HTMLCanvasElement>,
    config: Chart.ChartConfiguration
  );

  readonly platform: BasePlatform;
  readonly id: string;
  readonly ctx: CanvasRenderingContext2D;
  readonly config: Chart.ChartConfiguration;
  readonly width: number;
  readonly height: number;
  readonly aspectRatio: number;
  readonly options: Chart.ChartOptions;
  readonly currentDevicePixelRatio: number;
  readonly chartArea: IChartArea;
  readonly data: Chart.ChartData; // TODO
  readonly scales: { [key: string]: Scale };
  readonly scale: Scale | undefined;
  readonly attached: boolean;

  clear(): this;
  stop(): this;

  resize(silent: boolean, width: number, height: number): void;
  ensureScalesHaveIDs(): void;
  buildOrUpdateScales(): void;
  buildOrUpdateControllers(): void;
  reset(): void;
  update(mode?: string): void;
  render(): void;
  draw(): void;

  getElementAtEvent(e: Event): InteractionElement | undefined;
  getElementsAtEvent(e: Event): InteractionElement[];
  getElementsAtXAxis(e: Event): InteractionElement[];
  getElementsAtEventForMode(e: Event, mode: string, options: any, useFinalPosition: boolean): InteractionElement[];
  getDatasetAtEvent(e: Event): InteractionElement | undefined;

  getSortedVisibleDatasetMetas(): IChartMeta[];
  getDatasetMeta(datasetIndex: number): IChartMeta;
  getVisibleDatasetCount(): number;
  isDatasetVisible(datasetIndex: number): boolean;
  setDatasetVisibility(datasetIndex: number, visible: boolean): void;
  toggleDataVisibility(index: number): void;
  getDataVisibility(index: number): boolean;
  hide(datasetIndex: number): void;
  show(datasetIndex: number): void;

  destroy(): void;
  toBase64Image(type?: string, quality?: any): string;
  bindEvents(): void;
  unbindEvents(): void;
  updateHoverStyle(items: Element, mode: 'dataset', enabled: boolean): void;

  static version: string;
  static instances: { [key: string]: Chart };
  static registry: Registry;
  static register(...items: IRegisterElementLike[]): void;
  static unregister(...items: (IRegistryElement | IRegistryElement[] | { [key: string]: IRegistryElement })[]): void;
}
export interface IRegistryElement {
  id: string;
  defaults?: any;
  defaultRoutes: { [property: string]: string };
}

export interface IPlugin {
  id: string;
}

export class Element {
  readonly x: number;
  readonly y: number;
  readonly active: boolean;
  tooltipPosition(useFinalPosition?: boolean): IPoint;
  hasValue(): boolean;
}

export interface IPoint {
  x: number;
  y: number;
}

export interface VisualElement<T = {}> extends Element {
  draw(ctx: CanvasRenderingContext2D): void;
  inRange(mouseX: number, mouseY: number, useFinalPosition?: boolean): boolean;
  inXRange(mouseX: number, useFinalPosition?: boolean): boolean;
  inYRange(mouseY: number, useFinalPosition?: boolean): boolean;
  getCenterPoint(useFinalPosition?: boolean): IPoint;
  getRange(axis: 'x' | 'y'): number;
  getProps(props: (keyof T)[], final?: boolean): Partial<T>;
}

export interface ICommonOptions {
  borderWidth: number;
  borderColor: string;
  backgroundColor: string;
}

export interface ISegment {
  start: number;
  end: number;
  loop: boolean;
}

export interface IChartArea {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

export interface ArcProps {
  x: number;
  y: number;
  startAngle: number;
  endAngle: number;
  innerRadius: number;
  outerRadius: number;
  circumference: number;
}
export interface Arc<T extends ArcProps = ArcProps> extends VisualElement<T> {
  readonly options: {
    borderAlign: 'center';
  } & ICommonOptions;
}
export interface Arc extends IRegistryElement {
  prototype: Arc;
  new (cfg: any): Arc;
}

export interface LineProps {}
export interface Line<T extends LineProps = LineProps> extends VisualElement<T> {
  readonly options: {
    borderCapStyle: 'butt' | 'round' | 'square';
    borderDash: number[];
    borderDashOffset: number;
    borderJoinStyle: 'bevel' | 'round' | 'miter';
    capBezierPoints: boolean;
    fill: boolean;
    tension: number;
    stepped: 'before' | 'after' | 'middle' | boolean;
  } & ICommonOptions;

  updateControlPoints(chartArea: IChartArea): void;
  points: IPoint[];
  readonly segments: ISegment[];
  first(): IPoint | false;
  last(): IPoint | false;
  interpolate(point: IPoint, property: 'x' | 'y'): undefined | IPoint | IPoint[];
  pathSegment(ctx: CanvasRenderingContext2D, segment: ISegment, params: any): undefined | boolean;
  path(ctx: CanvasRenderingContext2D): boolean;
}
export interface Line extends IRegistryElement {
  prototype: Line;
  new (cfg: any): Line;
}

export interface PointProps {
  x: number;
  y: number;
}
export interface Point<T extends PointProps = PointProps> extends VisualElement<T> {
  readonly skip: boolean;
  readonly options: {
    radius: number;
    hitRadius: number;
    hoverRadius: number;
    hoverBorderWidth: number;
    pointStyle:
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
  } & ICommonOptions;
}
export interface Point extends IRegistryElement {
  prototype: Point;
  new (cfg: any): Point;
}

export interface RectangleProps {
  x: number;
  y: number;
  base: number;
  horizontal: boolean;
  width: number;
  height: number;
}
export interface Rectangle<T extends RectangleProps = RectangleProps> extends VisualElement<T> {
  options: {
    borderSkipped: 'start';
  } & ICommonOptions;
}
export const Rectangle: IRegistryElement & {
  prototype: Rectangle;
  new (cfg: any): Rectangle;
};

// plugins
export interface IPlugin extends IRegistryElement {}

export const Filler: IPlugin;
export const Legend: IPlugin;
export const Title: IPlugin;
export const Tooltip: IPlugin & {
  readonly positioners: { [key: string]: (items: readonly Element[], eventPosition: IPoint) => IPoint };
};

export interface IChartMeta {
  type: string;
  controller: DatasetController;
  order: number;

  label: string;
  index: number;
  visible: boolean;

  stack: number;

  indexAxis: 'x' | 'y';

  data: Element[];
  dataset?: Element;

  hidden: boolean;

  xAxisID?: string;
  yAxisID?: string;
  rAxisID?: string;
  iAxisID: string;
  vAxisID: string;

  xScale?: Scale;
  yScale?: Scale;
  rScale?: Scale;
  iScale?: Scale;
  vScale?: Scale;

  _sorted: boolean;
  _stacked: boolean;
  _parsed: any[];
}

export const Ticks: {
  formatters: {
    numeric(tickValue: number, index: number, ticks: any[]): string;
    logarithmic(tickValue: number, index: number, ticks: any[]): string;
  };
};

export interface Scale extends Element {
  readonly id: string;
  readonly type: string;
  readonly options: any;
  readonly ctx: CanvasRenderingContext2D;
  readonly chart: Chart;
  top: number;
  bottom: number;
  left: number;
  right: number;
  width: number;
  height: number;
  maxWidth: number;
  maxHeight: number;
  paddingTop: number;
  paddingBottom: number;
  paddingLeft: number;
  paddingRight: number;
  axis: string;
  labelRotation: number;
  min: number;
  max: number;
  ticks: any[];
  getMatchingVisibleMetas(type: string): IChartMeta[];

  draw(chartArea: IChartArea): void;
  drawTitle(chartArea: IChartArea): void;
  drawLabels(chartArea: IChartArea): void;
  drawGrid(chartArea: IChartArea): void;

  getBaseValue(): number;
  getBasePixel(): number;
  getDecimalForPixel(pixel: number): number;
  getPixelForDecimal(decimal: number): number;
  getPixelForTick(index: number): number;
  getValueForPixel(pixel: number): number | undefined;
  getPixelForValue(value: number, index: number): number;
  getLabelForValue(value: number): string;

  init(options: any): void;
  parse(raw: any, index: number): any;
  getUserBounds(): { min: number; max: number; minDefined: boolean; maxDefined: boolean };
  getMinMax(canStack: boolean): { min: number; max: number };
  invalidateCaches(): void;
  getPadding: IChartArea;
  getTicks(): any[];
  getLabels(): string[];
  beforeUpdate(): void;
  update(maxWidth: number, maxHeight: number, margins: any): void;
  configure(): void;
  afterUpdate(): void;
  beforeSetDimensions(): void;
  setDimensions(): void;
  afterSetDimensions(): void;
  beforeDataLimits(): void;
  determineDataLimits(): void;
  afterDataLimits(): void;
  beforeBuildTicks(): void;
  buildTicks(): any[];
  afterBuildTicks(): void;
  beforeTickToLabelConversion(): void;
  generateTickLabels(ticks: any[]): void;
  afterTickToLabelConversion(): void;
  beforeCalculateLabelRotation(): void;
  calculateLabelRotation(): void;
  afterCalculateLabelRotation(): void;
  beforeFit(): void;
  fit(): void;
  afterFit(): void;

  isHorizontal(): boolean;
  isFullWidth(): boolean;
}

export interface CategoryScale extends Scale {}
export const CategoryScale: IRegistryElement & {
  prototype: CategoryScale;
  new (): CategoryScale;
};
export interface LinearScale extends Scale {}
export const LinearScale: IRegistryElement & {
  prototype: LinearScale;
  new (): LinearScale;
};
export interface LogarithmicScale extends Scale {}
export const LogarithmicScale: IRegistryElement & {
  prototype: LogarithmicScale;
  new (): LogarithmicScale;
};
export interface RadialLinearScale extends Scale {}
export const RadialLinearScale: IRegistryElement & {
  prototype: RadialLinearScale;
  new (): RadialLinearScale;
};
export interface TimeScale extends Scale {}
export const TimeScale: IRegistryElement & {
  prototype: TimeScale;
  new (): TimeScale;
};
export interface TimeSeriesScale extends TimeScale {}
export const TimeSeriesScale: IRegistryElement & {
  prototype: TimeSeriesScale;
  new (): TimeSeriesScale;
};

export * from './helpers';
