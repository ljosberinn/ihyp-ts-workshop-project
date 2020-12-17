import React, { useEffect } from "react";

import { Evolutions } from "../src/components/Evolutions";
import { Image } from "../src/components/Image";
import { Nav } from "../src/components/Nav";
import { StatsTable } from "../src/components/StatsTable";
import { Summary } from "../src/components/Summary";
import { PokemonContextProvider } from "../src/context/Pokemon";
import { usePokemon } from "../src/hooks/usePokemon";
import { className } from "../src/utils/className";

// eslint-disable-next-line import/no-default-export
export default function Index(): JSX.Element {
  return (
    <PokemonContextProvider>
      <Pokemon />
    </PokemonContextProvider>
  );
}

function Pokemon() {
  const { pokemon, seenPokemon } = usePokemon();

  useEffect(() => {
    if (pokemon) {
      document.title = `${pokemon.num} - ${pokemon.name}`;
    }
  }, [pokemon]);

  if (!pokemon) {
    return <h1>still waiting for the API</h1>;
  }

  return (
    <div className="flex justify-center h-100 align-center">
      <Nav position="left" />

      <main className="w-25 p-4 h-50">
        <section>
          <h1 className="text-center">
            {pokemon.num} - {pokemon.name}
          </h1>

          <div className="flex justify-center">
            <Image
              src={pokemon.img}
              alt={pokemon.name}
              className={className(
                "transition-25",
                !seenPokemon.includes(pokemon.id) && "grayscale opacity-25"
              )}
            />
          </div>

          <StatsTable />

          <div className="mt-4">
            <Summary category="Types" color="green">
              {pokemon.type}
            </Summary>

            <Summary category="Weaknesses" color="red">
              {pokemon.weaknesses}
            </Summary>
          </div>

          <Evolutions />
        </section>
      </main>

      <Nav position="right" />
    </div>
  );
}
