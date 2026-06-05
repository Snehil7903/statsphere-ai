type DatasetTableProps = {
  data: Record<string, any>[];
};

export default function DatasetTable({
  data,
}: DatasetTableProps) {
  return (
    <div className="mt-8 overflow-x-auto">

      <table className="w-full border-collapse border">

        <thead>
          <tr>

            {Object.keys(data[0]).map(
              (key) => (
                <th
                  key={key}
                  className="border p-3 text-left"
                >
                  {key}
                </th>
              )
            )}

          </tr>
        </thead>

        <tbody>

          {data.map((row, index) => (
            <tr key={index}>

              {Object.values(row).map(
                (value, i) => (
                  <td
                    key={i}
                    className="border p-3"
                  >
                    {String(value)}
                  </td>
                )
              )}

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}