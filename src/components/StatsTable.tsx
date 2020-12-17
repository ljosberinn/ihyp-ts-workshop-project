import type { Pokemon } from "../../types/pokemon";
import { PokemonContextDefinition } from "../context/Pokemon";
import { Button } from "./Button";
import { Image } from "./Image";

type StatsTableProps = Pick<Pokemon, "height" | "weight" | "id"> &
  Pick<PokemonContextDefinition, "toggleCaughtPokemon" | "toggleSeen"> & {
    caught: boolean;
    seen: boolean;
  };

export function StatsTable({
  height,
  weight,
  caught,
  seen,
  toggleSeen,
  toggleCaughtPokemon,
  id,
}: StatsTableProps): JSX.Element {
  return (
    <table>
      <thead>
        <tr>
          <th>height</th>
          <th>weight</th>
          <th>caught</th>
          <th>seen</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="text-center">{height}</td>
          <td className="text-center">{weight}</td>
          <td className="text-center">
            <Button
              onClick={() => {
                toggleCaughtPokemon(id);
              }}
            >
              <Image
                src="/pokeball.png"
                className={caught ? undefined : "grayscale transition-25"}
                alt={caught ? "yes" : "no"}
              />
            </Button>
          </td>
          <td className="text-center">
            <Button
              onClick={() => {
                toggleSeen(id);
              }}
            >
              {seen ? "yes" : "no"}
            </Button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
