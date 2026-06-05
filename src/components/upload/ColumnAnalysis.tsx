import { DatasetProfile } from "@/types/dataset";

type ColumnAnalysisProps = {
  profile: DatasetProfile;
};

export default function ColumnAnalysis({
  profile,
}: ColumnAnalysisProps) {
  return (
    <div className="mt-8 border rounded-xl p-6">

      <h3 className="text-xl font-semibold mb-4">
        Column Analysis
      </h3>

      <div className="mb-4">
        <h4 className="font-medium">
          Numeric Columns
        </h4>

        <ul className="list-disc ml-6">
          {profile.numericColumns.map(
            (column) => (
              <li key={column}>
                {column}
              </li>
            )
          )}
        </ul>
      </div>

      <div>
        <h4 className="font-medium">
          Categorical Columns
        </h4>

        <ul className="list-disc ml-6">
          {profile.categoricalColumns.map(
            (column) => (
              <li key={column}>
                {column}
              </li>
            )
          )}
        </ul>
      </div>

    </div>
  );
}