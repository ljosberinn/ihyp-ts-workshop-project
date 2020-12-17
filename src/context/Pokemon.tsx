import {
  createContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";

import { Pokemon } from "../../types/pokemon";
import { WithChildren } from "../utils/types";

export type PokemonContextDefinition = {
  allPokemon: Pokemon[];
  seenPokemon: Set<number>;
  caughtPokemon: Set<number>;
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
  const [seenPokemon, setSeenPokemon] = useState<Set<number>>(new Set([]));
  const [caughtPokemon, setCaughtPokemon] = useState<Set<number>>(new Set([]));
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

  function toggleCaughtPokemon(id: number) {
    setCaughtPokemon((current) => {
      if (current.has(id)) {
        const filtered = [...current].filter((existingId) => existingId !== id);
        return new Set(filtered);
      }

      return new Set([...current, id]);
    });
  }

  function toggleSeen(id: number) {
    // eslint-disable-next-line sonarjs/no-identical-functions
    setSeenPokemon((current) => {
      if (current.has(id)) {
        const filtered = [...current].filter((existingId) => existingId !== id);
        return new Set(filtered);
      }

      return new Set([...current, id]);
    });
  }

  function findEvolution(id: string) {
    return allPokemon.find((pokemon) => pokemon.num === id) ?? null;
  }

  const value = {
    allPokemon,
    caughtPokemon,
    findEvolution,
    firstId: allPokemon.length > 0 ? allPokemon[0].id : -1,
    lastId: allPokemon.length - 1,
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
