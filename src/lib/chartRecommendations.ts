export function getChartRecommendations(
  numericColumns: string[],
  categoricalColumns: string[]
): string[] {
  const recommendations: string[] = [];

  if (numericColumns.length > 0) {
    recommendations.push("Histogram");
    recommendations.push("Distribution Analysis");
    recommendations.push("Box Plot");
  }

  if (categoricalColumns.length > 0) {
    recommendations.push("Bar Chart");
    recommendations.push("Category Distribution");
  }

  if (numericColumns.length >= 2) {
    recommendations.push("Scatter Plot");
    recommendations.push("Correlation Analysis");
  }

  return recommendations;
}