

export interface Trip {
  id: number;
  departureDateTime: string;
  originState: string;
  destinationState: string;
  seatsAvailable: number;
}

export type TripResponse = Trip[];

