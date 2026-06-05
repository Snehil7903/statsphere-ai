"use client";

import { useState } from "react";
import Papa from "papaparse";
import RecommendationSection
  from "@/components/upload/RecommendationSection";

import { profileDataset } from "@/lib/datasetProfiler";
import { DatasetProfile } from "@/types/dataset";

import ProfileSection from "@/components/upload/ProfileSection";
import ColumnAnalysis from "@/components/upload/ColumnAnalysis";
import DatasetTable from "@/components/upload/DatasetTable";

import AutoChart
  from "@/components/upload/AutoChart";

export default function UploadPage() {
  const [data, setData] = useState<Record<string, any>[]>([]);
  const [profile, setProfile] =
    useState<DatasetProfile | null>(null);

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,

      complete: (results) => {
        const parsed =
          results.data as Record<string, any>[];

        setData(parsed);
        setProfile(profileDataset(parsed));
      },
    });
  };

  return (
    <div>

      <h1 className="text-4xl font-bold mb-8">
        Upload Dataset
      </h1>

      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
      />

      {profile && (
        <>
          <ProfileSection profile={profile} />

          <ColumnAnalysis profile={profile} />

          <RecommendationSection
            profile={profile}
          />

          {profile.numericColumns.length > 0 && (

            <AutoChart
              data={data}
              column={
                profile.numericColumns[0]
              }
            />

          )}
        </>
      )}

      {data.length > 0 && (
        <DatasetTable data={data} />
      )}

    </div>
  );
}