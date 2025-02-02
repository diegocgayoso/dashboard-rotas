import { City } from "../lib/citites";

const api_url = "http://localhost:3000";

export interface Trip {
  id: string;
  departureDateTime: string;
  originState: string;
  destinationState: string;
  seatsAvailable: number;
};
export interface Reservation {
  id: string;
  fullName: string;
  cpf: string;
  departureCity: string;
  arrivalCity: string;
  departureDate: string;
};
export const createTrip = async (trip: Omit<Trip, "id">) => {
  const response = await fetch(api_url + "/trips", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...trip,
      departureDateTime: new Date(trip.departureDateTime).toISOString(),
    }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Erro ao cadastrar viagem: ${errorData.message}`);
  }
  return response.json();
};
export const createReservation = async (reserve: Reservation) => {
  const response = await fetch(api_url + "/reservations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...reserve,
      departureDate: new Date(reserve.departureDate).toISOString(),
    }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Erro ao cadastrar reserva: ${errorData.message}`);
  }
  return response.json();
};
export const fetchTrips = async () => {
  const response = await fetch(api_url + "/trips");
  if (!response.ok) {
    throw new Error(`Erro ao buscar viagens. Status: ${response.status}`);
  }
  return response.json();
};
export const fetchReservations = async () => {
  const response = await fetch(api_url + "/reservations");
  if (!response.ok) {
    throw new Error(`Erro ao buscar reservas. Status: ${response.status}`);
  }
  return response.json();
};
export const fetchAvailableTrips = async (
  origin: City,
  destination: City,
): Promise<Trip[]> => {
  const response = await fetch(api_url + `/trips?originState=${origin.split('-')[1]}&destinationState=${destination.split('-')[1]}`);
  if (!response.ok) throw new Error(`Erro ao buscar viagens disponíveis. Status: ${response.status}`);
  const allTrips: Trip[] = await response.json();
  
  return allTrips.filter(trip => 
    new Date(trip.departureDateTime) >= new Date() && // Viagens futuras
    trip.seatsAvailable > 0 && // Com vagas disponíveis
    trip.departureDateTime.startsWith(new Date().toISOString().split('T')[0]) // Na data selecionada
  );
}