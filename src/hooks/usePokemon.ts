import { useContext } from "react";

import type { PokemonContextDefinition } from "../context/Pokemon";
import { PokemonContext } from "../context/Pokemon";

export function usePokemon(): PokemonContextDefinition {
  const ctx = useContext(PokemonContext);

  if (!ctx) {
    throw new Error("[usePokemon] used outside of [PokemonContextProvider]");
  }

  return ctx;
}
