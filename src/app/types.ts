export type IsoString = string;
export type Latency = {
  client_start: IsoString;
  client_end: IsoString;
  middleware_start: IsoString;
  middleware_end: IsoString;
  server_start: IsoString;
  server_end: IsoString;
};
