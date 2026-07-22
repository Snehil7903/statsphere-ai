import { QualityReport }
from "@/types/quality";

type Props = {
  report: QualityReport;
};

export default function QualitySection({
  report,
}: Props) {

  return (
    <div className="mt-8 border rounded-xl p-6">

      <h2 className="text-2xl font-bold mb-4">
        Dataset Quality
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

        <div className="border rounded-lg p-4">
          Health Score

          <div className="text-3xl font-bold mt-2">
            {report.qualityScore}
          </div>
        </div>

        <div className="border rounded-lg p-4">
          Missing Values

          <div className="text-3xl font-bold mt-2">
            {report.missingValues}
          </div>
        </div>

        <div className="border rounded-lg p-4">
          Duplicate Rows

          <div className="text-3xl font-bold mt-2">
            {report.duplicateRows}
          </div>
        </div>

        <div className="border rounded-lg p-4">
          Outlier Columns

          <div className="text-3xl font-bold mt-2">
            {report.outlierColumns.length}
          </div>
        </div>

      </div>

      {report.outlierColumns.length > 0 && (
        <div className="mt-6">

          <h3 className="font-semibold mb-2">
            Outliers Detected
          </h3>

          <ul className="list-disc ml-6">

            {report.outlierColumns.map(
              (column) => (
                <li key={column}>
                  {column}
                </li>
              )
            )}

          </ul>

        </div>
      )}

    </div>
  );
}