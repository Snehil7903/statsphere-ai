import { QualityReport } from "@/types/quality";

export function generateQualityReport(
  data: Record<string, any>[],
  numericColumns: string[]
): QualityReport {

  let missingValues = 0;

  data.forEach((row) => {
    Object.values(row).forEach((value) => {
      if (
        value === "" ||
        value === null ||
        value === undefined
      ) {
        missingValues++;
      }
    });
  });

  const uniqueRows = new Set(
    data.map((row) =>
      JSON.stringify(row)
    )
  );

  const duplicateRows =
    data.length - uniqueRows.size;

  const outlierColumns: string[] = [];

  numericColumns.forEach((column) => {

    const values = data
      .map((row) => Number(row[column]))
      .filter((value) => !isNaN(value));

    if (values.length < 2) return;

    const mean =
      values.reduce(
        (sum, value) => sum + value,
        0
      ) / values.length;

    const variance =
      values.reduce(
        (sum, value) =>
          sum +
          Math.pow(
            value - mean,
            2
          ),
        0
      ) / values.length;

    const stdDev =
      Math.sqrt(variance);

    const hasOutlier =
      values.some(
        (value) =>
          Math.abs(
            value - mean
          ) >
          3 * stdDev
      );

    if (hasOutlier) {
      outlierColumns.push(column);
    }
  });

  let qualityScore = 100;

  qualityScore -= missingValues;
  qualityScore -= duplicateRows * 5;
  qualityScore -= outlierColumns.length * 10;

  qualityScore =
    Math.max(0, qualityScore);

  return {
    missingValues,
    duplicateRows,
    outlierColumns,
    qualityScore,
  };
}