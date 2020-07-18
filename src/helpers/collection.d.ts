export interface IArrayListener<T> {
  _onDataPush(...item: T[]): void;
  _onDataPop(): void;
  _onDataShift(): void;
  _onDataSplice(index: number, deleteCount: number, ...items: T[]): void;
  _onDataUnshift(...item: T[]): void;
}

export function listenArrayEvents<T>(array: T[], listener: IArrayListener<T>): void;
export function unlistenArrayEvents<T>(array: T[], listener: IArrayListener<T>): void;
