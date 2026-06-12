export interface NumericColumnStats {
  column: string;

  count: number;

  mean: number;
  median: number;

  min: number;
  max: number;
}