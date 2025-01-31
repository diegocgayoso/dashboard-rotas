import { CITIES_BY_STATE, City, getCityState, State } from "../lib/citites";
import { DEPARTURE_DATES_BY_STATE } from "../lib/dates";
import { useState, useEffect } from "react";

export type TravelAvailability = {
  arrivalCities: City[];
  departureDates: Date[];
};

export function useTravelAvailability(departureCity: City | "") {
  const [availability, setAvailability] = useState<TravelAvailability>({
    arrivalCities: [],
    departureDates: [],
  });

  useEffect(() => {
    if (!departureCity) {
      setAvailability({ arrivalCities: [], departureDates: [] });
      return;
    }

    const departureState = getCityState(departureCity) as State;
    const arrivalCities =
      departureState === "MA" ? CITIES_BY_STATE.DF : CITIES_BY_STATE.MA;
    const departureDates = DEPARTURE_DATES_BY_STATE[departureState];

    setAvailability({
      arrivalCities: [...arrivalCities],
      departureDates: [...departureDates],
    });
  }, [departureCity]);

  return availability;
}
