export interface MenuItem {
  name?: string;
  materialIcon?: string;
  route: string | Array<string>;
};

interface BroadcastingDraftField {
  [key: string]: string | number;
};
export type BroadcastingDraftElement = Array<BroadcastingDraftField>;

export interface BroadcastingElement {
  title: string;
  content: string;
  channel: number;
  status?: string;
  agent?: string;
  send?: number;
  views?: number;
  clicks?: number;
  created: Date;
};