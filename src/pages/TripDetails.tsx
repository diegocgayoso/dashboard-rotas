// import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTripById } from "../service/api";
// import { Trip } from "../interfaces/ITrips";
import { ArrowRight } from "lucide-react";
import { useTripReservations } from "../hooks/useTripReservations";
import { useEffect, useState } from "react";
import { Trip } from "../interfaces/ITrips";

export default function TripDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [trip, setTrip] = useState<Trip>({} as Trip);

  useEffect(() => {
    if (id) {
      getTripById(Number(id)).then((trip) => setTrip(trip));
    }
  }, [id]);
  const { data, isLoading, isError } = useTripReservations(Number(id));

  return (
    <div className="trip-details">
      <h1>Detalhes da Viagem</h1>
      <div className="flex p-2 bg-sky-900 flex-col mb-2 ">
        <p className="flex text-3xl items-center">
          {trip.originState} <ArrowRight /> {trip.destinationState}
        </p>
        <p>Data e Hora: {new Date(trip.departureDateTime).toLocaleString()}</p>
      </div>

      {isLoading && <p>Carregando...</p>}
      {!isLoading && isError && <p>Erro ao carregar reservas.</p>}
      {!isLoading && !isError && (
        <table className="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Data da Reserva</th>
              <th>Assento</th>
            </tr>
          </thead>
          <tbody>
            {data?.data.map((reservation) => (
              <tr key={reservation.id}>
                <td>{reservation.passengerName}</td>
                <td>
                  {new Date(reservation.reservationDate).toLocaleString()}
                </td>
                <td>{reservation.seatNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="flex gap-2 justify-end">
        <button onClick={() => navigate(-1)} className="btn-submit">
          Voltar
        </button>
      </div>
    </div>
  );
}
