export function generateFrequencyData(
  data: Record<string, any>[],
  column: string
) {
  const frequencyMap =
    new Map<number, number>();

  data.forEach((row) => {
    const value =
      Number(row[column]);

    frequencyMap.set(
      value,
      (frequencyMap.get(value) || 0) + 1
    );
  });

  return Array.from(
    frequencyMap.entries()
  ).map(([value, count]) => ({
    value,
    count,
  }));
}