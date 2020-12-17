import { useEffect } from "react";

import { Button } from "../src/components/Button";
import { Image } from "../src/components/Image";
import { StatsTable } from "../src/components/StatsTable";
import { Summary } from "../src/components/Summary";
import { PokemonContextProvider } from "../src/context/Pokemon";
import { usePokemon } from "../src/hooks/usePokemon";

// eslint-disable-next-line import/no-default-export
export default function Index(): JSX.Element {
  return (
    <PokemonContextProvider>
      <Pokemon />
    </PokemonContextProvider>
  );
}

function Pokemon() {
  const {
    setCurrentPokemon,
    pokemon,
    firstId,
    lastId,
    findEvolution,
    caughtPokemon,
    seenPokemon,
    toggleCaughtPokemon,
    toggleSeen,
  } = usePokemon();

  useEffect(() => {
    if (pokemon) {
      document.title = `${pokemon.num} - ${pokemon.name}`;
    }
  }, [pokemon]);

  if (!pokemon) {
    return null;
  }

  return (
    <div className="flex justify-center h-100 align-center">
      <aside>
        <nav>
          <Button
            disabled={pokemon.id === firstId}
            onClick={() => {
              setCurrentPokemon(firstId);
            }}
            className="mr-2"
            aria-label="first"
          >
            {"<<"}
          </Button>

          <Button
            disabled={pokemon.id === firstId}
            onClick={() => {
              setCurrentPokemon((prev) => prev - 1);
            }}
            aria-label="last"
          >
            {"<"}
          </Button>
        </nav>
      </aside>

      <main className="w-25 p-4 h-50">
        <section>
          <h1 className="text-center">
            {pokemon.num} - {pokemon.name}
          </h1>

          <div className="flex justify-center">
            <Image src={pokemon.img} alt={pokemon.name} />
          </div>

          <StatsTable
            {...pokemon}
            caught={caughtPokemon.has(pokemon.id)}
            seen={seenPokemon.has(pokemon.id)}
            toggleCaughtPokemon={toggleCaughtPokemon}
            toggleSeen={toggleSeen}
          />

          <div className="mt-4">
            <Summary category="Types" color="green">
              {pokemon.type}
            </Summary>

            <Summary category="Weaknesses" color="red">
              {pokemon.weaknesses}
            </Summary>
          </div>

          {pokemon.next_evolution ? (
            <div>
              <h2 className="text-center my-2">evolutions</h2>
              <div className="flex justify-center space-evenly">
                {pokemon.next_evolution.map((evolution) => {
                  const { img, name } = findEvolution(evolution.num);

                  return (
                    <div className="text-center" key={evolution.num}>
                      <Image src={img} alt={name} height="80px" width="80px" />
                      <br />
                      {evolution.num} - {evolution.name}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <h2 className="text-center my-2">no evolutions</h2>
          )}
        </section>
      </main>

      <aside>
        <nav>
          <Button
            disabled={pokemon.id === lastId}
            onClick={() => {
              setCurrentPokemon((prev) => prev + 1);
            }}
            className="mr-2"
            aria-label="next"
          >
            {">"}
          </Button>

          <Button
            disabled={pokemon.id === lastId}
            onClick={() => {
              setCurrentPokemon(lastId);
            }}
            aria-label="last"
          >
            {">>"}
          </Button>
        </nav>
      </aside>
    </div>
  );
}
