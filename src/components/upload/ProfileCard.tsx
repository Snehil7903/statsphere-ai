type ProfileCardProps = {
  title: string;
  value: string | number;
};

export default function ProfileCard({
  title,
  value,
}: ProfileCardProps) {
  return (
    <div className="rounded-2xl border p-6">

      <h3 className="text-gray-500">
        {title}
      </h3>

      <p className="text-3xl font-bold mt-3">
        {value}
      </p>

    </div>
  );
}