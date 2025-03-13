import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
import { Modal } from "./Modal";
import { SelectField } from "./SelectField";
import { PokemonType } from "../types/PokemonType";
import { fetchPokemonList } from "../api/pokeapi";

const schema = z.object({
  Name: z
    .string()
    .min(2)
    .max(12)
    .regex(/[A-Za-z]/, "Name must contain only letters"),
  Surname: z
    .string()
    .min(2)
    .max(12)
    .regex(/[A-Za-z]/, "Surname must contain only letters"),
});

export const TrainerForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pokemons, setPokemons] = useState<PokemonType[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonType[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [trainerName, setTrainerName] = useState<string>("");
  const [trainerSurname, setTrainerSurname] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pokemonList: PokemonType[] = await fetchPokemonList();
        setPokemons(pokemonList);
      } catch (error) {
        console.error("Error fetching Pokemon list:", error);
      }
    };

    fetchData();
  }, []);

  const onSubmit = (data: { Name: string; Surname: string }) => {
    if (selectedPokemon.length === 4) {
      setTrainerName(data.Name);
      setTrainerSurname(data.Surname);
      setIsModalOpen(true);
      setErrorMessage(null);
    } else {
      setErrorMessage("Please select exactly 4 Pokémon.");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = () => {
    setIsModalOpen(false);
    setSelectedPokemon([]);
    reset({
      Name: "",
      Surname: "",
    });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col border border-gray-900/10 p-6 rounded-md space-y-4"
      >
        <p className="flex justify-center">Trainer Pokemon Form</p>
        <div className="flex flex-col gap-2">
          <p>Name</p>
          <input
            type="text"
            placeholder="Name"
            className="border-2 border-gray-900/10 hover:border-violet-800 rounded-md h-10 px-4 py-3"
            {...register("Name")}
          />
          {errors.Name && (
            <span className="text-red-500 text-xs">{errors.Name.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <p>Surname</p>
          <input
            type="text"
            placeholder="Surname"
            className="border-2 border-gray-900/10 hover:border-violet-800 rounded-md h-10 px-4 py-3"
            {...register("Surname")}
          />
          {errors.Surname && (
            <span className="text-red-500 text-xs">
              {errors.Surname.message}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <SelectField
            pokemons={pokemons}
            selectedPokemon={selectedPokemon}
            setSelectedPokemon={setSelectedPokemon}
          />
        </div>
        {errorMessage && (
          <div className="text-red-500 text-xs">{errorMessage}</div>
        )}
        <div className="flex justify-center">
          <input
            type="submit"
            className="hover:bg-purple-500 text-white px-4 py-2 rounded-md bg-purple-600 w-6/12"
          />
        </div>
      </form>

      {isModalOpen && (
        <Modal
          onClose={handleCloseModal}
          onSave={handleSave}
          pokemons={selectedPokemon}
          trainerName={trainerName}
          trainerSurname={trainerSurname}
        />
      )}
    </div>
  );
};
