import { ChangeEvent, FormEvent, useState } from "react";
import { CITIES_BY_STATE, City } from "../lib/citites";
import { useTravelAvailability } from "../hooks/useTravelAvailability";
import { formatDate } from "../utils/formatDate";

export default function ReservationForm() {

  const [departureCity, setDepartureCity] = useState<City | "">("");
  const [arrivalCity, setArrivalCity] = useState<City | "">("");
  const [departureDate, setDepartureDate] = useState<string>("");
  const [arrivalDate, setArrivalDate] = useState<string>("");

  const { arrivalCities, departureDates } = useTravelAvailability(departureCity);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({
      departureCity,
      arrivalCity,
      departureDate,
      arrivalDate,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form-group">
      <div className="form-field">
        <label id="name">Nome completo</label>
        <input type="text" id="name" placeholder="Maria da Silva" required />
      </div>
      <div className="form-field">
        <label id="name">CPF</label>
        <input type="number" id="name" placeholder="000.000.000-00" required />
      </div>

      <div className="form-field">
        <label htmlFor="departureCity">Cidade de Embarque</label>
        <select
          id="departureCity"
          value={departureCity}
          onChange={(e) => setDepartureCity(e.target.value as City)}
        >
          <option value="">Selecione uma cidade</option>
          {[...CITIES_BY_STATE.MA, ...CITIES_BY_STATE.DF].map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="arrivalCity">Cidade de Desembarque</label>
        <select
          id="arrivalCity"
          value={arrivalCity}
          onChange={(e) => setArrivalCity(e.target.value as City)}
          disabled={!departureCity}
        >
          <option value="">Selecione uma cidade</option>
          {arrivalCities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="departureDate">Data de Embarque</label>
        <select
          id="departureDate"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          disabled={!departureCity}
        >
          <option value="">Selecione uma data</option>
          {departureDates.map((date, index) => (
            <option key={index} value={date.toISOString()}>
              {formatDate(date)}
            </option>
          ))}
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="arrivalDate">Data de Desembarque</label>
        <input
          type="date"
          id="arrivalDate"
          value={arrivalDate}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setArrivalDate(e.target.value)
          }
          min={departureDate.split('T')[0]} // Restringe datas anteriores à de embarque
        />
      </div>

      <button type="submit" className="btn-submit">
        Reservar
      </button>
    </form>
  );
}
