import { State } from "../lib/cities";

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
  origin: State,
  destination: State,
  departureDate: Date = new Date(), // Novo parâmetro opcional
  minSeats: number = 1 // Novo parâmetro opcional
): Promise<Trip[]> => {
  const queryParams = new URLSearchParams({
    originState: origin.split('-')[1],
    destinationState: destination.split('-')[1],
    departureDate: departureDate.toISOString().split('T')[0], // Data formatada
    minSeats: minSeats.toString() // Mínimo de assentos
  });

  const response = await fetch(`${api_url}/trips?${queryParams}`);
  
  if (!response.ok) throw new Error(`Erro ao buscar viagens. Status: ${response.status}`);
  
  return await response.json(); // Assume que o servidor já retorna filtrado
};
