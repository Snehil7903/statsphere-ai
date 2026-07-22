export interface QualityReport {
  missingValues: number;
  duplicateRows: number;
  outlierColumns: string[];

  qualityScore: number;
}