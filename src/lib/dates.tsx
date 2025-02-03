import { State } from "./cities";

export const DEPARTURE_DATES_BY_STATE: Record<State, Date[]> = {
  MA: [new Date("2024-03-01"), new Date("2024-03-15"), new Date("2024-04-01")],
  DF: [new Date("2024-03-05"), new Date("2024-03-20"), new Date("2024-04-05")],
  SP: [new Date("2024-03-05"), new Date("2024-03-20"), new Date("2024-04-05")],
};
