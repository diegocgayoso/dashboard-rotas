import { StateSelect, StateType } from "../components/StateSelect";
import { useState, FormEvent } from "react";

// Define o tipo para os estados, facilitando a reutilização e evitando erros de digitação


// Interface para tipar os dados da viagem
interface Trip {
  departureDateTime: string;
  originState: StateType;
  destinationState: StateType;
  seatsAvailable: number;
}

// Componente para selecionar o estado, reutilizável para origem e destino



export default function TripForm() {
  const [trip, setTrip] = useState<Trip>({
    departureDateTime: "",
    originState: "",
    destinationState: "",
    seatsAvailable: 0,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/trips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...trip,
          departureDateTime: new Date(trip.departureDateTime).toISOString(),
        }),
      });

      if (response.ok) {
        alert("Viagem cadastrada com sucesso!");
        setTrip({
          departureDateTime: "",
          originState: "",
          destinationState: "",
          seatsAvailable: 0,
        });
      } else {
        const errorData = await response.json(); // Tenta obter detalhes do erro do servidor
        console.error("Erro ao cadastrar viagem:", response.status, errorData);
        alert(`Erro ao cadastrar viagem: ${response.status}`); // Exibe mensagem de erro para o usuário
      }
    } catch (error) {
      console.error("Erro ao cadastrar viagem:", error);
      alert("Erro ao cadastrar viagem. Verifique o console para mais detalhes."); // Mensagem genérica para o usuário
    }
  };

  const handleOriginStateChange = (value: StateType) => {
    setTrip((prev) => ({ ...prev, originState: value }));
  };

  const handleDestinationStateChange = (value: StateType) => {
    setTrip((prev) => ({ ...prev, destinationState: value }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-group flex-col ">
        <div>
          <StateSelect
            value={trip.originState}
            onChange={handleOriginStateChange}
            excludedState={trip.destinationState}
            label="Estado de Origem"
          />

          <StateSelect
            value={trip.destinationState}
            onChange={handleDestinationStateChange}
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
            <input type="number" name="seatsAvailable" id="" min={0} max={50} value={trip.seatsAvailable} onChange={(e) => setTrip({ ...trip, seatsAvailable: Number(e.target.value) })       } />
          </div>
        </div>

        <button type="submit" className="btn-submit ">
          Cadastrar Viagem
        </button>
      </form>
    </div>
  );
}