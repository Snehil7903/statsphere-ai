import { DatasetProfile } from "@/types/dataset";
import { getChartRecommendations } from "./chartRecommendations";

export function profileDataset(
  data: Record<string, any>[]
): DatasetProfile {

  if (!data.length) {
    return {
      rowCount: 0,
      columnCount: 0,
      numericColumns: [],
      categoricalColumns: [],
      missingValues: 0,
      duplicateRows: 0,
      recommendedCharts: [],
    };
  }

  const columns = Object.keys(data[0]);

  const numericColumns: string[] = [];
  const categoricalColumns: string[] = [];

  columns.forEach((column) => {

    const values = data
      .map((row) => row[column])
      .filter(
        (value) =>
          value !== "" &&
          value !== null &&
          value !== undefined
      );

    const isNumeric =
      values.length > 0 &&
      values.every(
        (value) => !isNaN(Number(value))
      );

    if (isNumeric) {
      numericColumns.push(column);
    } else {
      categoricalColumns.push(column);
    }
  });

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

  const recommendedCharts =
    getChartRecommendations(
      numericColumns,
      categoricalColumns
    );

  return {
    rowCount: data.length,
    columnCount: columns.length,
    numericColumns,
    categoricalColumns,
    missingValues,
    duplicateRows,
    recommendedCharts,
  };
}