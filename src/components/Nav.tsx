import { usePokemon } from "../hooks/usePokemon";
import { Button } from "./Button";

type NavProps = {
  position: "left" | "right";
};

export function Nav({ position }: NavProps): JSX.Element {
  const { pokemon, lastId, setCurrentPokemon, firstId } = usePokemon();

  const isLeft = position === "left";

  return (
    <aside>
      <nav>
        <Button
          disabled={pokemon.id === (isLeft ? firstId : lastId)}
          onClick={() => {
            setCurrentPokemon((prev) => (isLeft ? firstId : prev + 1));
          }}
          className="mr-2"
          aria-label={isLeft ? "first" : "next"}
        >
          {isLeft ? "<<" : ">"}
        </Button>

        <Button
          disabled={pokemon.id === (isLeft ? firstId : lastId)}
          onClick={() => {
            setCurrentPokemon((prev) => (isLeft ? prev - 1 : lastId));
          }}
          aria-label="last"
        >
          {isLeft ? "<" : ">>"}
        </Button>
      </nav>
    </aside>
  );
}
