import { usePokemon } from "../hooks/usePokemon";
import { className } from "../utils/className";
import { Button } from "./Button";
import { Image } from "./Image";

export function StatsTable(): JSX.Element {
  const {
    caughtPokemon,
    toggleCaughtPokemon,
    toggleSeen,
    seenPokemon,
    pokemon: { id, height, weight },
  } = usePokemon();

  const seen = seenPokemon.includes(id);
  const caught = caughtPokemon.includes(id);

  return (
    <table>
      <thead>
        <tr>
          <th>height</th>
          <th>weight</th>
          <th>caught</th>
          <th>
            <label htmlFor="seen">seen</label>
          </th>
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
              className="appearance-none"
            >
              <Image
                src="/pokeball.png"
                className={className(
                  "transition-25",
                  caught ? undefined : "grayscale opacity-25"
                )}
                alt={caught ? "caught" : "not caught"}
              />
            </Button>
          </td>
          <td className="text-center">
            <input
              id="seen"
              type="checkbox"
              disabled={caughtPokemon.includes(id)}
              checked={seen}
              onChange={() => {
                toggleSeen(id);
              }}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
