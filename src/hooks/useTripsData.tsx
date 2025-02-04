import { getTrips } from "../service/api";
import { useQuery } from "@tanstack/react-query";

export function useTripsData() {
  const query = useQuery({
    queryFn: getTrips,
    queryKey: ["trips"],
  });
  return query;
}
