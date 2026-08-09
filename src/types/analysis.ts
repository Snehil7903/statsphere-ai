import { DatasetProfile } from "./dataset";
import { QualityReport } from "./quality";
import { NumericColumnStats } from "./statistics";
import { VisualizationRecommendation } from "./visualization";

export interface DatasetAnalysis {
  profile: DatasetProfile;

  statistics: NumericColumnStats[];

  quality: QualityReport;

  visualizations: VisualizationRecommendation[];

  insights: string[];
}