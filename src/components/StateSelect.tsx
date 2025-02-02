import { ChangeEvent } from "react";

export type StateType = "MA" | "DF" | "";

export const StateSelect = ({
  value,
  onChange,
  excludedState,
  label,
}: {
  value: StateType;
  onChange: (value: StateType) => void;
  excludedState: StateType;
  label: string;
}) => (
  <div className="form-field w-full">
    <label>{label}</label>
    <select
      value={value}
      onChange={(e: ChangeEvent<HTMLSelectElement>) => {
        const newValue = e.target.value as StateType;
        onChange(newValue);
      }}
      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
      required
    >
      <option value="">Selecione o estado</option>
      {["MA", "DF"]
        .filter((state) => state !== excludedState)
        .map((state) => (
          <option key={state} value={state}>
            {state === "MA" ? "Maranhão" : "Distrito Federal"}
          </option>
        ))}
    </select>
  </div>
);
