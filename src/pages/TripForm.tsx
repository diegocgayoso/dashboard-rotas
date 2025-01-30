import React, { useState, FormEvent, ChangeEvent } from 'react';

interface Trip {
  departureDateTime: string;
  originState: 'MA' | 'DF';
  destinationState: 'MA' | 'DF';
  seatsAvailable: number;
}

const TripForm: React.FC = () => {
  const [trip, setTrip] = useState<Trip>({
    departureDateTime: '',
    originState: 'MA',
    destinationState: 'DF',
    seatsAvailable: 40
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3001/trips', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...trip,
          departureDateTime: new Date(trip.departureDateTime).toISOString()
        })
      });

      if (response.ok) {
        alert('Viagem cadastrada com sucesso!');
        setTrip({
          departureDateTime: '',
          originState: 'MA',
          destinationState: 'DF',
          seatsAvailable: 40
        });
      }
    } catch (error) {
      console.error('Erro ao cadastrar viagem:', error);
    }
  };

  const handleStateChange = (stateType: 'origin' | 'destination') => 
    (e: ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value as 'MA' | 'DF';
      setTrip(prev => ({
        ...prev,
        originState: stateType === 'origin' ? value : prev.originState,
        destinationState: stateType === 'destination' ? value : prev.destinationState
      }));
    };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Data e Hora de Saída</label>
        <input
          type="datetime-local"
          value={trip.departureDateTime}
          onChange={(e) => setTrip({...trip, departureDateTime: e.target.value})}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>

      <div className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Estado de Origem</label>
          <select
            value={trip.originState}
            onChange={handleStateChange('origin')}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="MA">Maranhão</option>
            <option value="DF">Distrito Federal</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Estado de Destino</label>
          <select
            value={trip.destinationState}
            onChange={handleStateChange('destination')}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="DF">Distrito Federal</option>
            <option value="MA">Maranhão</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
      >
        Cadastrar Viagem
      </button>
    </form>
  );
};

export default TripForm;