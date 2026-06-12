import { NumericColumnStats } from "@/types/statistics";

export function calculateStats(
  data: Record<string, any>[],
  column: string
): NumericColumnStats {

  const values = data
    .map((row) => Number(row[column]))
    .filter((value) => !isNaN(value));

  const sorted = [...values].sort(
    (a, b) => a - b
  );

  const count = values.length;

  const mean =
    values.reduce(
      (sum, value) => sum + value,
      0
    ) / count;

  const median =
    count % 2 === 0
      ? (
          sorted[count / 2 - 1] +
          sorted[count / 2]
        ) / 2
      : sorted[
          Math.floor(count / 2)
        ];

  return {
    column,

    count,

    mean: Number(
      mean.toFixed(2)
    ),

    median,

    min: sorted[0],

    max: sorted[count - 1],
  };
}