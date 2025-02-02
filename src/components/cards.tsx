import { fetchTrips } from "../service/api";
import { useEffect, useState } from "react";

export default function CardWrapper() {
  const [tripCount, setTripCount] = useState<number | null>(null);
  const [loading, setLoadind] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTrips = async () => {
      try {
        const trips = await fetchTrips();
        setTripCount(trips.length);
      } catch  {
        setError("Erro ao carregar viagens");
      } finally {
        setLoadind(false);
      }
    };
    loadTrips();
  }, []);
  if(loading) return <div>Carregando...</div>
  if(error) return <div>{error}</div>
  return (
    <div className="flex gap-2 justify-center">
      <Card title="Viagens registradas" value={tripCount ?? 0} />
      <Card title="Total de passageiros" value="350" />
    </div>
  );
}
export function Card({
  title,
  value,
}: {
  title: string;
  value: number | string;
}) {
  return (
    <div className="rounded-xl p-2 shadow-sm">
      <div className="flex p-4">
        <h3 className="ml-2 text-sm font-medium text-gray-300">{title}</h3>
      </div>
      <p className="truncate rounded-xl bg-zinc-950 px-4 py-8 text-center text-gray-400 text-2xl">
        {value}
      </p>
    </div>
  );
}
