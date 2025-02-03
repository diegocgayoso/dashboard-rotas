export const CITIES_BY_STATE = {
  MA: [
    "Imperatriz",
    "Açailândia",
    "Bom Jesus da Selva",
    "Buriticupu",
    "Santa Luzia",
    "Santa Inês",
    "Igarapé do Meio",
    "Vitória do Mearim",
    "Viana",
    "Santeiro",
    "Matinha",
    "Olinda",
    "Bom Viver",
    "São Vicente",
    "Zé de Mariana",
    "São Bento",
    "Pinheiro",
    "Ponta Branca",
    "Cedral",
    "São Luis",
    "Cururupu",
    "Mirinzal",
    "3 Marias",
    "Central",
    "Porto Rico",
  ] as const,
  DF: ["Brasília", "Taguatinga", "Ceilândia", "Gama"] as const,
  SP: ["São Paulo", "Campinas", "Guarulhos"] as const 
};

// Tipos automáticos
export type CITIES_TYPE = typeof CITIES_BY_STATE;
export type State = keyof CITIES_TYPE;
export type City<T extends State = State> = CITIES_TYPE[T][number];
export type AllCities = City<State>;

// Função genérica
export const getCityState = (city: AllCities): State => {
  const stateEntries = Object.entries(CITIES_BY_STATE) as [State, readonly string[]][];
  
  for (const [state, cities] of stateEntries) {
    if (cities.includes(city)) return state;
  }
  
  throw new Error(`Cidade ${city} não encontrada em nenhum estado`);
};

export const getAllCities = (): AllCities[] => {
  return Object.values(CITIES_BY_STATE).flat() as AllCities[];
};

// Função para obter estados dinamicamente
export const getStates = (): State[] => Object.keys(CITIES_BY_STATE) as State[];



// export type MaranhaoCity = (typeof CITIES_BY_STATE.MA)[number];
// export type DistritoFederalCity = (typeof CITIES_BY_STATE.DF)[number];
// export type City = MaranhaoCity | DistritoFederalCity;
// export type State = keyof typeof CITIES_BY_STATE;

// export const getCityState = (city: City): State => {
//   if (CITIES_BY_STATE.MA.includes(city as MaranhaoCity)) return "MA";
//   return "DF";
// };

// export const getStates = (): State[] => ["MA", "DF"];