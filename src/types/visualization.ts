export type ChartType =
  | "histogram"
  | "bar"
  | "scatter"
  | "pie"
  | "box"
  | "heatmap";

export interface VisualizationRecommendation {

  id: string;

  title: string;

  chartType: ChartType;

  columns: string[];

  description: string;
}