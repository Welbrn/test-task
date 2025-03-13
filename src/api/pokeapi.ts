import axios from "axios";
import { PokemonType } from "../types/PokemonType";

export const fetchPokemonList = async (): Promise<PokemonType[]> => {
  try {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=100"
    );
    const pokemonData = await Promise.all(
      response.data.results.map(
        async (pokemon: { name: string; url: string }) => {
          const details = await axios.get(pokemon.url);
          return {
            name: pokemon.name,
            sprite: details.data.sprites.front_default,
          };
        }
      )
    );
    return pokemonData;
  } catch (error) {
    console.error("Error fetching Pokémon list:", error);
    throw error;
  }
};
