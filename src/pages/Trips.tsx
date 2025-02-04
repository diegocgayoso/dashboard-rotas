// import { Link } from "react-router-dom";
import { TripCard } from "../components/cards";
import { useTripsData } from "../hooks/useTripsData";

export function Trips() {
  const { data, isLoading, isError } = useTripsData();

  return (
    <>
      <h1>Lista de Viagens</h1>
      <div className="trips-list">
        {isLoading && <p>Carregando...</p>}
        {!isLoading && isError && <p>Erro ao carregar viagens</p>}
        {!isLoading && !isError && (
          (data?.data ?? []).map((trip) => (
            <TripCard
              departure={trip.originState}
              arrival={trip.destinationState}
              dateTime={new Date(trip.departureDateTime)}
              availableSeats={0}
              key={trip.id}
              id={trip.id}
            />
          ))
        )}

      </div>
    </>
  );
}
