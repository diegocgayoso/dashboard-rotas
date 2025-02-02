import { createTrip } from "../service/api";
import { StateSelect, StateType } from "../components/StateSelect";
import { useState, FormEvent, useEffect } from "react";

export default function TripForm() {
  const [trip, setTrip] = useState({
    departureDateTime: "",
    originState: "" as StateType,
    destinationState: "" as StateType,
    seatsAvailable: 0,
  });

  useEffect(() => {
    if (trip.originState === trip.destinationState && trip.originState !== "") {
      setTrip((prev) => ({
        ...prev,
        destinationState: "",
      }));
    }
  }, [trip.destinationState, trip.originState]);

  useEffect(() => {
    if (
      trip.destinationState === trip.originState &&
      trip.destinationState !== ""
    ) {
      setTrip((prev) => ({
        ...prev,
        originState: "",
      }));
    }
  }, [trip.destinationState, trip.originState]);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (trip.originState === trip.destinationState) {
      alert("Origem e destino não podem ser iguais!");
      return;
    }
    try {
      await createTrip(trip);
      alert("Viagem cadastrada com sucesso!");
      setTrip({
        departureDateTime: "",
        originState: "",
        destinationState: "",
        seatsAvailable: 0,
      });
    } catch (error) {
      console.error("Erro ao cadastrar viagem:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Erro ao cadastrar viagem. Verifique o console para mais detalhes."
      ); // Mensagem genérica para o usuário
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-group flex-col ">
        <div>
          <StateSelect
            value={trip.originState}
            onChange={(value) =>
              setTrip((prev) => ({ ...prev, originState: value }))
            }
            excludedState={trip.destinationState}
            label="Estado de Origem"
          />

          <StateSelect
            value={trip.destinationState}
            onChange={(value) =>
              setTrip((prev) => ({ ...prev, destinationState: value }))
            }
            excludedState={trip.originState}
            label="Estado de Destino"
          />

          <div className="form-field w-full  ">
            <label className="block text-sm font-medium text-gray-700">
              Data e Hora de Saída
            </label>
            <input
              type="datetime-local"
              value={trip.departureDateTime}
              onChange={(e) =>
                setTrip({ ...trip, departureDateTime: e.target.value })
              }
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="form-field w-full">
            <label className="block text-sm font-medium text-gray-700">
              Número de poltronas
            </label>
            <input
              type="number"
              name="seatsAvailable"
              id=""
              min={0}
              max={50}
              value={trip.seatsAvailable}
              onChange={(e) =>
                setTrip({ ...trip, seatsAvailable: Number(e.target.value) })
              }
            />
          </div>
        </div>

        <button type="submit" className="btn-submit ">
          Cadastrar Viagem
        </button>
      </form>
    </div>
  );
}
