import { AllCities } from "../lib/cities";
import { StateType } from "../components/StateSelect";

import axios from "axios";

const api_url = "http://localhost:3000";

export interface Trip {
  id: number;
  departureDateTime: string;
  originState: StateType;
  destinationState: StateType;
  seatsAvailable: number;
}
export interface Reservation {
  id: number;
  tripId: number;
  passengerName: string;
  reservationDate: string;
  seatNumber: number;
  departureCity: AllCities;
  arrivalCity: AllCities;
}
export const getTrips = async () => {
  const response = await axios.get<Trip[]>(`${api_url}/trips`);
  return response.data;
};

export const getTripById = async (id: number): Promise<Trip> => {
  const response = await axios.get<Trip>(`${api_url}/trips/${id}`);
  return response.data;
};

export const updateTrip = async (id: number, trip: Partial<Trip>) => {
  const response = await axios.patch<Trip>(`${api_url}/trips/${id}`, trip);
  return response.data;
};

export const createTrip = async (trip: Omit<Trip, "id">) => {
  const response = await axios.post<Trip>(`${api_url}/trips`, trip);
  return response.data;
};
export const getReservationsByTripId = async (tripId: number) => {
  const response = await axios.get<Reservation[]>(
    `${api_url}/reservations?tripId=${tripId}`
  );
  return response.data;
};
