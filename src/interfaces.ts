export interface Options {
  hotkey: string;
  enabled: boolean;
  statusMessage: boolean;
}

export interface KeypressEvent extends Event {
  metaKey: boolean;
  ctrlKey: boolean;
  target: HTMLInputElement;
  which: number;
}

export interface OffsetRange {
  start: number;
  end: number;
}
