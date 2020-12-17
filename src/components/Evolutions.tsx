import { usePokemon } from "../hooks/usePokemon";
import { className } from "../utils/className";
import { Image } from "./Image";

export function Evolutions(): JSX.Element {
  const { pokemon, findEvolution, seenPokemon } = usePokemon();

  const evolutions = [
    ...(pokemon.prev_evolution ?? []),
    ...(pokemon.next_evolution ?? []),
  ]
    .map((evolution) => findEvolution(evolution.num))
    .flatMap((evolution, index, arr) => {
      if (evolution.id < pokemon.id) {
        const isLast = index === arr.length - 1;

        return isLast ? [evolution, pokemon] : evolution;
      }

      if (evolution.id === pokemon.id + 1) {
        return [pokemon, evolution];
      }

      return evolution;
    });

  if (evolutions.length === 0) {
    return <h2 className="text-center my-2">no evolutions</h2>;
  }

  return (
    <div>
      <h2 className="text-center my-2">evolutions</h2>
      <div className="flex justify-center space-evenly">
        {evolutions.map((evolution) => (
          <div className="text-center" key={evolution.num}>
            <Image
              src={evolution.img}
              alt={evolution.name}
              height="80px"
              width="80px"
              className={className(
                "transition-25",
                !seenPokemon.includes(evolution.id) && "grayscale opacity-25"
              )}
            />
            <br />
            {evolution.num} - {evolution.name}
          </div>
        ))}
      </div>
    </div>
  );
}
