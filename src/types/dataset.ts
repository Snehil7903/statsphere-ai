export interface DatasetProfile {
  rowCount: number;
  columnCount: number;

  numericColumns: string[];
  categoricalColumns: string[];

  missingValues: number;
  duplicateRows: number;

  recommendedCharts: string[];
}