import { Link } from "react-router-dom";
import { TripCard } from "../components/cards";
import { getTrips, Trip } from "../service/api";
import { useEffect, useState } from "react";

export function TripList() {
  const [trip, setTrip] = useState<Trip[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const tripData = await getTrips();
      setTrip(tripData);
    };
    loadData();
  }, []);
  return (
    <>
      <h1>Lista de Viagens</h1>
      <div className="trips-list">
        {trip.map((trip) => (
          <Link to={`/trips/${trip.id}`} key={trip.id}>
            <TripCard
              key={trip.id}
              id={trip.id}
              departure={trip.originState}
              arrival={trip.destinationState}
              dateTime={new Date(trip.departureDateTime)}
              availableSeats={trip.seatsAvailable}
            />
          </Link>
        ))}
      </div>
    </>
  );
}
