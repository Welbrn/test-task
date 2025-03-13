import { ChangeEvent } from "react";
import { PokemonType } from "../types/PokemonType";

type Props = {
  pokemons: PokemonType[];
  selectedPokemon: PokemonType[];
  setSelectedPokemon: (pokemon: PokemonType[]) => void;
}

export const SelectField: React.FC<Props> = ({
  pokemons,
  selectedPokemon,
  setSelectedPokemon,
}) => {
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = pokemons.find(
      (option) => option.name === event.target.value
    );
    if (
      selectedOption &&
      selectedPokemon.length < 4 &&
      !selectedPokemon.includes(selectedOption)
    ) {
      setSelectedPokemon([...selectedPokemon, selectedOption]);
    }
  };

  const handleRemoveChip = (pokemon: PokemonType) => {
    setSelectedPokemon(selectedPokemon.filter((p) => p !== pokemon));
  };

  return (
    <>
      <div className="flex flex-col gap-1">
        <p>Select</p>
        <select
          onChange={handleSelectChange}
          name="Pokemon"
          className="border-2 border-gray-900/10 hover:border-violet-800 rounded-md h-10 px-4"
        >
          <option value="">Select a Pokemon</option>
          {pokemons.map((pokemon) => (
            <option
              key={pokemon.name}
              value={pokemon.name}
              disabled={selectedPokemon.includes(pokemon)}
              className={selectedPokemon.includes(pokemon) ? "bg-gray-200" : ""}
            >
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {selectedPokemon.map((pokemon) => (
          <div
            key={pokemon.name}
            className="flex items-center gap-1 border border-gray-900/10 rounded-full px-2.5 py-0.5"
          >
            <span>
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </span>
            <button
              type="button"
              onClick={() => handleRemoveChip(pokemon)}
              className="text-red-500"
            >
              x
            </button>
          </div>
        ))}
      </div>
    </>
  );
};
