"use client";

import { useState, useRef, useCallback } from "react";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { UploadCloud, FileSpreadsheet, Sparkles, Loader2 } from "lucide-react";

import RecommendationSection from "@/components/upload/RecommendationSection";
import { profileDataset } from "@/lib/datasetProfiler";
import { DatasetProfile } from "@/types/dataset";
import ProfileSection from "@/components/upload/ProfileSection";
import ColumnAnalysis from "@/components/upload/ColumnAnalysis";
import DatasetTable from "@/components/upload/DatasetTable";
import AutoChart from "@/components/upload/AutoChart";
import StatisticsSection
  from "@/components/upload/StatisticsSection";
import { QualityReport } from "@/types/quality";


import {
  generateQualityReport,
}
from "@/lib/dataQualityEngine";


export default function UploadPage() {
  const [data, setData] = useState<Record<string, any>[]>([]);
  const [profile, setProfile] = useState<DatasetProfile | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
const [qualityReport,
setQualityReport] =
useState<QualityReport | null>(
  null
);
  const containerRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const dropzoneRef = useRef<HTMLDivElement>(null);

  // Clean initial entrance animation for text typography layout
  useGSAP(() => {
    gsap.from(".hero-text", {
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.12,
      ease: "power3.out",
    });
  }, { scope: containerRef });

  // Explicit fromTo handling for the dropzone on page mount or reset
  useGSAP(() => {
    if (!profile && dropzoneRef.current) {
      gsap.fromTo(dropzoneRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
      );
    }
  }, { dependencies: [profile], scope: containerRef });

  // Dashboard reveal staggering when dataset profile matches arrive
  useGSAP(() => {
    if (profile && resultsRef.current) {
      gsap.fromTo(".dashboard-card",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: "power3.out" }
      );
    }
  }, { dependencies: [profile], scope: resultsRef });

  // Core Orchestrator: Dispatches parsing behavior based on true file extensions
  const processFile = (file: File) => {
    if (!file) return;

    const extension = file.name.split(".").pop()?.toLowerCase();
    if (extension !== "csv" && extension !== "xlsx" && extension !== "xls") {
      alert("Invalid format profile. Please drop a valid CSV or Excel workbook.");
      return;
    }

    setIsParsing(true);

    // Flow Setup A: Handle Standard Comma Separated Matrices via PapaParse
    if (extension === "csv") {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
        complete: (results) => {
          const parsed = results.data as Record<string, any>[];
          finalizeDatasetProcessing(parsed);
        },
      });
    }
    // Flow Setup B: Parse Binary Excel Workbooks via SheetJS Layout Vectors
    else {
      const reader = new FileReader();
      reader.onload = (e) => {
        const arrayBuffer = e.target?.result;
        if (!arrayBuffer) return;

        const workbook = XLSX.read(arrayBuffer, { type: "array" });
        // Target the very first worksheet tab index default frame automatically
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // Parse array metrics into readable JSON object tracks directly
        const parsed = XLSX.utils.sheet_to_json(worksheet, { defval: null }) as Record<string, any>[];
        finalizeDatasetProcessing(parsed);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  // Shared completion pipeline runner to handle state alignment cleanly
  const finalizeDatasetProcessing = (parsedData: Record<string, any>[]) => {
    setTimeout(() => {
      setData(parsedData);
      setProfile(profileDataset(parsedData));
      setIsParsing(false);
    }, 500);
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black overflow-x-hidden relative"
    >
      {/* Ambient Background Glow */}
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-fuchsia-500/10 blur-[120px] pointer-events-none" />

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-20 md:py-32">

        {/* Hero Section */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="hero-text inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-zinc-300 mb-6 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            Intelligent Data Profiling
          </div>
          <h1 className="hero-text text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
            Upload Dataset
          </h1>
          <p className="hero-text text-lg md:text-xl text-zinc-400 font-light">
            Drop your CSV or Excel workbook below to instantly generate structural insights, statistical profiles, and automated visualizations.
          </p>
        </div>

        {/* Upload Dropzone Container */}
        {!profile && (
          <div
            ref={dropzoneRef}
            className="transition-all duration-500 ease-out max-w-2xl mx-auto"
          >
            <label
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`flex flex-col items-center justify-center w-full h-80 rounded-[2rem] border-2 border-dashed cursor-pointer relative overflow-hidden backdrop-blur-md group shadow-2xl transition-all duration-300
                ${isDragging
                  ? "border-indigo-500 bg-indigo-500/15 ring-4 ring-indigo-500/10"
                  : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20"
                }
              `}
            >
              <input
                type="file"
                accept=".csv, .xlsx, .xls" // Expanded visual click filtering parameters
                className="hidden"
                onChange={handleFileInput}
                disabled={isParsing}
              />

              <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-6 relative z-10">
                {isParsing ? (
                  <Loader2 className="w-16 h-16 text-indigo-400 animate-spin mb-6" />
                ) : (
                  <div className="p-5 rounded-full bg-white/5 border border-white/10 group-hover:scale-110 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/20 transition-all duration-300 mb-6 shadow-xl">
                    <UploadCloud className="w-10 h-10 text-zinc-300 group-hover:text-indigo-400 transition-colors" />
                  </div>
                )}

                <h3 className="text-2xl font-semibold mb-2 text-white">
                  {isParsing ? "Analyzing Data Structure..." : "Click or drag your dataset here"}
                </h3>
                <p className="text-zinc-400 text-sm max-w-xs font-light">
                  Supports unified comma-separated matrices or modern Excel sheets (.csv, .xlsx, .xls)
                </p>
              </div>

              <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/0 to-indigo-500/5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </label>
          </div>
        )}

        {/* Dynamic Results Dashboard */}
        {profile && (
          <div ref={resultsRef} className="space-y-12">
            {/* Header Actions */}
            <div className="dashboard-card flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-500/20 rounded-xl">
                  <FileSpreadsheet className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                  <h2 className="text-xl font-medium text-white">Dataset Active</h2>
                  <p className="text-zinc-400 text-sm">{data.length.toLocaleString()} rows processed</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setProfile(null);
                  setData([]);
                }}
                className="px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors border border-white/5"
              >
                Upload New
              </button>
            </div>

            {/* Top Level Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="dashboard-card lg:col-span-1">
                <ProfileSection profile={profile} />
              </div>
              <div className="dashboard-card lg:col-span-2">
                <RecommendationSection profile={profile} />
              </div>
            </div>

            {/* Analysis Grid */}
            <div className="dashboard-card w-full">
              <ColumnAnalysis profile={profile} />
            </div>

            {/* Auto Chart Workspace Container */}
            {profile.numericColumns.length > 0 && (
              <div className="dashboard-card w-full">
                <AutoChart data={data} column={profile.numericColumns[0]} />
              </div>
            )}

            <StatisticsSection
              data={data}
              numericColumns={
                profile.numericColumns
              }
            />

            {/* Raw Data Table */}
            {data.length > 0 && (
              <div className="dashboard-card w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm">
                <div className="p-6 border-b border-white/10">
                  <h3 className="text-xl font-semibold text-white">Raw Data Explorer</h3>
                </div>
                <DatasetTable data={data} />
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}