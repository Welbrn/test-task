import { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import { SelectField } from "../components/SelectField";
import { PokemonType } from "../types/PokemonType";
import "../index.css";

export default {
  title: "Components/SelectField",
  component: SelectField,
  parameters: {
    docs: {
      description: {
        component: `
          The **SelectField** component allows you to select up to 4 Pokemon.
          - Uses the standard HTML select element.
          - Pokemon that are already selected become unavailable.
          - Ability to delete selected Pokemon.`,
      },
    },
  },
} as Meta<typeof SelectField>;

const Template: StoryFn<typeof SelectField> = (args) => {
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonType[]>([]);
  return (
    <SelectField
      {...args}
      selectedPokemon={selectedPokemon}
      setSelectedPokemon={setSelectedPokemon}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  pokemons: [
    {
      id: 1,
      name: "pikachu",
      sprite:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
    },
    {
      id: 4,
      name: "charmander",
      sprite:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
    },
    {
      id: 7,
      name: "squirtle",
      sprite:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
    },
    {
      id: 25,
      name: "bulbasaur",
      sprite:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    },
  ],
};
