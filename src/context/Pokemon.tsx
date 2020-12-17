import type { Dispatch, SetStateAction } from "react";
import { createContext, useState, useEffect } from "react";

import type { Pokemon } from "../../types/pokemon";
import type { WithChildren } from "../utils/types";

export type PokemonContextDefinition = {
  allPokemon: Pokemon[];
  seenPokemon: number[];
  caughtPokemon: number[];
  pokemon: Pokemon;
  toggleCaughtPokemon: (id: number) => void;
  toggleSeen: (id: number) => void;
  setCurrentPokemon: Dispatch<SetStateAction<number>>;
  firstId: number;
  lastId: number;
  findEvolution: (num: string) => Pokemon | null;
};

type PokemonContextProviderProps = WithChildren;

export const PokemonContext = createContext<PokemonContextDefinition | null>(
  null
);

export function PokemonContextProvider({
  children,
}: PokemonContextProviderProps): JSX.Element {
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  const [seenPokemon, setSeenPokemon] = useState<number[]>([]);
  const [caughtPokemon, setCaughtPokemon] = useState<number[]>([]);
  const [currentPokemon, setCurrentPokemon] = useState(1);

  useEffect(() => {
    fetch("/api/pokemon")
      // eslint-disable-next-line promise/prefer-await-to-then
      .then((response) => response.json())
      // eslint-disable-next-line promise/prefer-await-to-then
      .then(setAllPokemon)
      // eslint-disable-next-line no-console
      .catch(console.error);
  }, []);

  useEffect(() => {
    const desycned = caughtPokemon.filter((id) => !seenPokemon.includes(id));

    if (desycned.length > 0) {
      setSeenPokemon((prev) => [...prev, ...desycned]);
    }
  }, [caughtPokemon, seenPokemon]);

  function toggleCaughtPokemon(id: number) {
    setCaughtPokemon((current) => {
      if (current.includes(id)) {
        return [...current].filter((existingId) => existingId !== id);
      }

      return [...current, id];
    });
  }

  function toggleSeen(id: number) {
    // eslint-disable-next-line sonarjs/no-identical-functions
    setSeenPokemon((current) => {
      if (current.includes(id)) {
        return [...current].filter((existingId) => existingId !== id);
      }

      return [...current, id];
    });
  }

  function findEvolution(num: string) {
    return allPokemon.find((pokemon) => pokemon.num === num) ?? null;
  }

  const value = {
    allPokemon,
    caughtPokemon,
    findEvolution,
    firstId: allPokemon.length > 0 ? allPokemon[0].id : -1,
    lastId: allPokemon.length,
    pokemon: allPokemon.find((pokemon) => pokemon.id === currentPokemon),
    seenPokemon,
    setCurrentPokemon,
    toggleCaughtPokemon,
    toggleSeen,
  };

  return (
    <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>
  );
}
