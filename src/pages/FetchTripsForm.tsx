import { FormEvent, useEffect, useState } from "react";
import { AllCities, getAllCities, getCityState } from "../lib/cities";
import { useTravelAvailability } from "../hooks/useTravelAvailability";
import { getTrips, Trip } from "../service/api";
import { TripCard } from "../components/cards";

export default function FetchTripsForm() {
  const [departureCity, setDepartureCity] = useState<AllCities | null>(null);
  const [arrivalCity, setArrivalCity] = useState<AllCities | null>(null);

  const { arrivalCities } = useTravelAvailability(departureCity);

  const [trips, setTrips] = useState<Trip[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setArrivalCity(null);
  }, [departureCity]);

  const isValidCity = (value: string): value is AllCities => {
    return getAllCities().includes(value as AllCities);
  };

  const handleCityChange = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<AllCities | null>>
  ) => {
    setError(null);
    if (isValidCity(value)) {
      setter(value);
    } else {
      setter(null);
    }
  };
  const resetForm = () => {
    setDepartureCity(null);
    setArrivalCity(null);
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Buscando viagens...");
    try {
      setIsLoading(true);
      const response = await getTrips();
      if (response.length > 0) {
        setTrips(response);
      }
      resetForm();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
    const fetchedTrips = await getTrips();
    if (fetchedTrips.length > 0) {
      setTrips(fetchedTrips);
    } else {
      setError("Nenhuma viagem encontrada");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form-group">
        <div className="form-field">
          <label htmlFor="departureCity">Cidade de Embarque</label>
          <select
            id="departureCity"
            value={departureCity || ""}
            onChange={(e) => handleCityChange(e.target.value, setDepartureCity)}
            disabled={isLoading}
          >
            <option value="">Selecione uma cidade</option>
            {getAllCities().map((city) => (
              <option key={`${city}-${getCityState(city)}`} value={city}>
                {city} ({getCityState(city)})
              </option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="arrivalCity">Cidade de Desembarque</label>
          <select
            id="arrivalCity"
            value={arrivalCity || ""}
            onChange={(e) => handleCityChange(e.target.value, setArrivalCity)}
            disabled={!departureCity || isLoading}
          >
            <option value="">Selecione uma cidade</option>
            {arrivalCities.map((city) => (
              <option key={`${city}-${getCityState(city)}`} value={city}>
                {city} ({getCityState(city)})
              </option>
            ))}
          </select>
        </div>
        {error && <div className="error-message">{error}</div>}

        <button
          type="submit"
          className="btn-submit"
          disabled={!departureCity || !arrivalCity || isLoading}
        >
          {isLoading ? "Buscando..." : "Buscar"}
        </button>
      </form>
      {/* Listagem de viagens */}
      {trips.length > 0 && (
        <>
          <h3 className="text-center text-2xl my-6">Viagens Encontradas:</h3>
          <div className="trips-list">
            {trips.map((trip) => (
              <TripCard
                key={trip.id}
                id={trip.id}
                departure={trip.originState}
                arrival={trip.destinationState}
                dateTime={new Date(trip.departureDateTime)}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}
