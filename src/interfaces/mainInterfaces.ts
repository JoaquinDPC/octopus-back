export interface IRule {
  name: string,
  action: string,
  events: string[],
  prevents: string[],
  timmer: number,
  timeStampt: Date
};