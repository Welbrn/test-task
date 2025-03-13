import React from "react";
import { PokemonType } from "../types/PokemonType";

type Props = {
  pokemons: PokemonType[];
  onClose: () => void;
  onSave: () => void;
  trainerName: string;
  trainerSurname: string;
};

export const Modal: React.FC<Props> = ({
  onClose,
  onSave,
  pokemons,
  trainerName,
  trainerSurname,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col gap-7 bg-white rounded-lg p-6 min-h-80 min-w-80">
        <div className="flex justify-between">
          <p className="text-xl font-bold">Trainer Information</p>
          <button onClick={onClose} className="text-black flex font-bold">
            x
          </button>
        </div>
        <div>
          <p className="text-xm font-bold">Trainer Full Name:</p>
          <p className="text-xl capitalize">
            {trainerName} {trainerSurname}
          </p>
        </div>
        <div className="text-xm font-bold">Pokemon Team:</div>
        <ul>
          {pokemons.map((pokemon, index) => (
            <li key={index} className="flex items-center gap-2">
              <img
                src={pokemon.sprite}
                alt={pokemon.name}
                className="w-20 h-20"
              />
              <span className="text-xl capitalize">{pokemon.name}</span>
            </li>
          ))}
        </ul>

        <div className="flex justify-end gap-5">
          <button
            onClick={onClose}
            className="hover:bg-purple-500 text-white px-4 py-2 rounded-md bg-purple-600 w-6/12"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="hover:bg-purple-500 text-white px-4 py-2 rounded-md bg-purple-600 w-6/12"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
