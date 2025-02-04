import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getReservationsByTripId,
  getTripById,
  Reservation,
  updateTrip,
} from "../service/api";
import { Trip } from "../service/api";

export default function TripDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([
    {
      "id": 11,
      "tripId": 1,
      "passengerName": "João Silva",
      "reservationDate": "2024-03-19T10:00",
      "seatNumber": 1,
      "departureCity": "Imperatriz",
      "arrivalCity": "Brasília"
    }
  ]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const tripData = await getTripById(Number(id));
        const reservationsData = await getReservationsByTripId(Number(id));
        setTrip(tripData);
        setReservations(reservationsData);
        setReservations(
          Array.isArray(reservationsData) ? reservationsData : []
        );
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        alert("Erro ao carregar dados da viagem");
      }
    };
    loadData();
  }, [id]);

  const handleSave = async () => {
    if (trip) {
      try {
        await updateTrip(trip.id, trip);
        alert("Viagem atualizada com sucesso!");
        navigate("/trips");
      } catch (error) {
        console.error("Erro ao atualizar:", error);
        alert("Erro ao salvar alterações");
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (!trip) return;
    setTrip({
      ...trip,
      [e.target.name]: e.target.value,
    });
  };

  if (!trip) return <div>Carregando...</div>;

  return (
    <div className="trip-details">
      <h1>Detalhes da Viagem</h1>

      <div className="form-group">
        <label>
          Data e Hora:
          <input
            type="datetime-local"
            name="departureDateTime"
            value={trip.departureDateTime}
            onChange={handleChange}
          />
        </label>

        <label>
          Vagas Disponíveis:
          <input
            type="number"
            name="seatsAvailable"
            value={trip.seatsAvailable}
            onChange={handleChange}
            min="0"
            max="50"
          />
        </label>
      </div>

      <h2>
        Reservas ({reservations.length}/{trip.seatsAvailable})
      </h2>
      {reservations.length === 0 ? (
        <p>Nenhuma reserva encontrada</p>
      ) : (
        <ul className="reservations-list">
          {reservations?.map((reservation) => (
            <li key={reservation.id}>
              {reservation.passengerName} -
              {new Date(reservation.reservationDate).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}

      <div className="flex gap-2">
        <button onClick={() => navigate(-1)} className="btn-submit">
          Voltar
        </button>
        <button onClick={handleSave} className="btn-submit">
          Salvar Alterações
        </button>
      </div>
    </div>
  );
}
