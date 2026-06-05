type MetricCardProps = {
    title: string;
    value: string;
};

export default function MetricCard({ title, value }: MetricCardProps){
    return (
        <div className="rounded-2xl border p-6">
            <h3 className="text-gray-500">{title}</h3>
            <p className="text-2xl font-bold mt-2">{value}</p>
        </div>
    )
}