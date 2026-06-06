"use client";

import { useMemo, useState } from "react";
import { ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";

type DatasetTableProps = {
  data: Record<string, any>[];
};

export default function DatasetTable({ data }: DatasetTableProps) {
  // Pagination States
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(50);

  // Extract columns dynamically from the first row record
  const columns = useMemo(() => (data.length > 0 ? Object.keys(data[0]) : []), [data]);

  // Calculate total pages dynamically
  const totalPages = Math.ceil(data.length / rowsPerPage) || 1;

  // Compute precisely sliced segment for the current active page view
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage, rowsPerPage]);

  if (data.length === 0) return null;

  // Handle rows-per-page modification safely
  const handleRowsPerPageChange = (newSize: number) => {
    setRowsPerPage(newSize);
    setCurrentPage(1); // Reset back to first page window frame to eliminate offset anomalies
  };

  // Helper cell content parser
  const renderCellContent = (value: any) => {
    if (value === null || value === undefined || value === "null" || value === "") {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-zinc-800/40 text-zinc-500 border border-zinc-700/30 cursor-default">
          —
        </span>
      );
    }
    if (typeof value === "number" && !Number.isInteger(value)) {
      return value.toFixed(3);
    }
    return String(value);
  };

  return (
    <div className="w-full overflow-hidden bg-white/[0.01] border border-white/5 rounded-3xl backdrop-blur-xl shadow-2xl flex flex-col">
      
      {/* Table Header Workspace bar */}
      <div className="p-6 border-b border-white/5 bg-gradient-to-r from-white/[0.01] to-transparent flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold tracking-tight text-white">Raw Data Explorer</h3>
          <p className="text-xs text-zinc-500 mt-0.5">Iterate and explore deep records matrices seamlessly</p>
        </div>
        <div className="text-xs text-zinc-400 font-medium px-4 py-2 rounded-xl bg-white/5 border border-white/10 self-start sm:self-center">
          Viewing {(currentPage - 1) * rowsPerPage + 1}-
          {Math.min(currentPage * rowsPerPage, data.length).toLocaleString()} of{" "}
          <span className="text-indigo-400 font-bold">{data.length.toLocaleString()}</span> entries
        </div>
      </div>

      {/* Main Table Canvas Viewport */}
      <div className="w-full overflow-x-auto max-h-[500px] overflow-y-auto custom-scrollbar">
        <table className="w-full border-collapse text-left text-sm text-zinc-300">
          
          <thead className="sticky top-0 z-20 bg-zinc-950/90 backdrop-blur-md border-b border-white/10 text-xs font-semibold uppercase tracking-wider text-zinc-400">
            <tr>
              {columns.map((col) => (
                <th key={col} className="px-6 py-4 font-semibold select-none bg-zinc-950/40">
                  <div className="flex items-center gap-2 group cursor-default">
                    <span>{col.replace(/([A-Z])/g, " $1").trim()}</span>
                    <ArrowUpDown className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-white/[0.02]">
            {paginatedData.map((row, rowIndex) => (
              <tr 
                key={rowIndex} 
                className="transition-colors duration-150 odd:bg-transparent even:bg-white/[0.005] hover:bg-indigo-500/[0.03] group"
              >
                {columns.map((col) => (
                  <td key={col} className="px-6 py-3.5 text-zinc-300 group-hover:text-white transition-colors whitespace-nowrap font-light text-xs">
                    {renderCellContent(row[col])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* FIXED PAGINATION INTERFACE BAR: Clean control arrays */}
      <div className="p-4 border-t border-white/5 bg-zinc-950/50 flex flex-col sm:flex-row items-center justify-between gap-4 z-30">
        
        {/* Left Side: Rows-per-Page Configuration Selection */}
        <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium">
          <span>Display matrix size:</span>
          <select
            value={rowsPerPage}
            onChange={(e) => handleRowsPerPageChange(Number(e.target.value))}
            className="bg-zinc-900 border border-white/10 text-zinc-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-indigo-500/50 cursor-pointer text-xs"
          >
            {[10, 25, 50, 100].map((size) => (
              <option key={size} value={size} className="bg-zinc-950 text-white">
                {size} rows
              </option>
            ))}
          </select>
        </div>

        {/* Right Side: Page Incremental Vectors */}
        <div className="flex items-center gap-4">
          <span className="text-xs text-zinc-500 font-medium">
            Page <span className="text-white font-semibold">{currentPage}</span> of{" "}
            <span className="text-zinc-400">{totalPages}</span>
          </span>

          <div className="flex items-center gap-1.5">
            {/* Previous Page Button Selector */}
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 disabled:hover:text-zinc-400 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Next Page Button Selector */}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 disabled:hover:text-zinc-400 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}