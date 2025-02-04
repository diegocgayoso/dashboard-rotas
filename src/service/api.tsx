import { AllCities } from "../lib/cities";

import axios, {  AxiosPromise } from "axios";
import { Trip } from "@/interfaces/ITrips";

const api_url = "http://localhost:3000";


export interface Reservation {
  id: number;
  tripId: number;
  passengerName: string;
  reservationDate: string;
  seatNumber: number;
  departureCity: AllCities;
  arrivalCity: AllCities;
}
export const getTrips = async (): AxiosPromise<Trip[]> => {
  const response = await axios.get<Trip[]>(api_url + `/trips`);
  return response;
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
export const getReservationsByTripId = async (tripId: number) : AxiosPromise<Reservation[]>  => {
  const response = await axios.get<Reservation[]>(
    `${api_url}/reservations?tripId=${tripId}`
  );
  return response;
};


