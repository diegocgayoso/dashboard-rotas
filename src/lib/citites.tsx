export type MaranhaoCity = (typeof CITIES_BY_STATE.MA)[number];
export type DistritoFederalCity = (typeof CITIES_BY_STATE.DF)[number];
export type City = MaranhaoCity | DistritoFederalCity;
export type State = keyof typeof CITIES_BY_STATE;

export const getCityState = (city: City): State => {
  if (CITIES_BY_STATE.MA.includes(city as MaranhaoCity)) return "MA";
  return "DF";
};
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
};

export const getStates = (): State[] => ["MA", "DF"];
