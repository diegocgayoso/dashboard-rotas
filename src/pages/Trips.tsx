import { useTripsData } from "../hooks/useTripsData";
import TripItem from "../components/TripItem";

export function Trips() {
  const { data, isLoading, isError } = useTripsData();

  return (
    <>
      <h1>Lista de Viagens</h1>
      <div className="table">
        {isLoading && <p>Carregando...</p>}
        {!isLoading && isError && <p>Erro ao carregar viagens</p>}

        {!isLoading && !isError && (
          <table className="table">
            <thead>
              <tr>
                <th>Origem</th>
                <th>Destino</th>
                <th>Data/Hora</th>
                <th>Assentos Disponíveis</th>
                <th>Detalhes</th>
              </tr>
            </thead>
            <tbody>
              {(data?.data ?? []).map((trip) => (
                <TripItem
                  key={trip.id}
                  id={trip.id}
                  departure={trip.originState}
                  arrival={trip.destinationState}
                  dateTime={new Date(trip.departureDateTime)}
                  availableSeats={trip.seatsAvailable}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
