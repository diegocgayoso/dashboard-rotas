import { getReservationsByTripId } from "../service/api";
import { useQuery } from "@tanstack/react-query";

export function useTripReservations(idTrip: number) {
    const query = useQuery({
        queryKey: ["reservationsByTripId"],
        queryFn: () => getReservationsByTripId(idTrip),
    })
    return query
}