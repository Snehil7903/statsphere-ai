import ProfileCard from "./ProfileCard";
import { DatasetProfile } from "@/types/dataset";

type ProfileSectionProps = {
  profile: DatasetProfile;
};

export default function ProfileSection({
  profile,
}: ProfileSectionProps) {
  return (
    <>
      <h2 className="text-2xl font-bold mt-8 mb-4">
        Dataset Profile
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

        <ProfileCard
          title="Rows"
          value={profile.rowCount}
        />

        <ProfileCard
          title="Columns"
          value={profile.columnCount}
        />

        <ProfileCard
          title="Missing Values"
          value={profile.missingValues}
        />

        <ProfileCard
          title="Duplicate Rows"
          value={profile.duplicateRows}
        />

      </div>
    </>
  );
}