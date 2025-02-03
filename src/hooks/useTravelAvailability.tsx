import { AllCities, CITIES_BY_STATE, getCityState, State } from "../lib/cities";
import { DEPARTURE_DATES_BY_STATE } from "../lib/dates";
import { useState, useEffect } from "react";

// 1. Criar tipo para mapeamento de destinos
type AllowedDestinations = {
  [key in State]: readonly AllCities[];
};

// 2. Definir regras de destinos permitidos
const DESTINATION_RULES: AllowedDestinations = {
  // MA: CITIES_BY_STATE.DF,
  // DF: CITIES_BY_STATE.MA,
  // SP: CITIES_BY_STATE.SP 
  // Exemplo: permitir viagens dentro do mesmo estado
  // Adicione novas regras para outros estados aqui
  MA: [...CITIES_BY_STATE.DF, ...CITIES_BY_STATE.SP], // Exemplo: MA permite DF e SP
  DF: [...CITIES_BY_STATE.MA, ...CITIES_BY_STATE.SP],
  SP: [...CITIES_BY_STATE.MA, ...CITIES_BY_STATE.DF, ...CITIES_BY_STATE.SP]
};

export type TravelAvailability = {
  arrivalCities: AllCities[];
  departureDates: Date[];
};

export function useTravelAvailability(departureCity: AllCities | null) {
  const [availability, setAvailability] = useState<TravelAvailability>({
    arrivalCities: [],
    departureDates: [],
  });

  useEffect(() => {
    if (!departureCity) {
      setAvailability({ arrivalCities: [], departureDates: [] });
      return;
    }

    try {
      const departureState = getCityState(departureCity);
      
      // 3. Obter destinos baseado nas regras
      const arrivalCities = DESTINATION_RULES[departureState]
        ? [...DESTINATION_RULES[departureState]]
        : [];

      // 4. Validar datas de partida
      const departureDates = DEPARTURE_DATES_BY_STATE[departureState] || [];

      setAvailability({
        arrivalCities: arrivalCities.filter(city => city !== departureCity),
        departureDates: [...departureDates]
      });

    } catch (error) {
      console.error("Erro ao buscar disponibilidade:", error);
      setAvailability({ arrivalCities: [], departureDates: [] });
    }
  }, [departureCity]);

  return availability;
}