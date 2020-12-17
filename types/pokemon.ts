export type Pokemon = {
  id: number;
  num: string;
  name: string;
  img: string;
  type: string[];
  height: string;
  weight: string;
  candy: string;
  candy_count?: number;
  egg: Record<string, string>;
  spawn_chance: number;
  avg_spawns: number;
  spawn_time: string;
  multipliers: number[] | null;
  weaknesses: string[];
  next_evolution?: Evolution[];
  prev_evolution?: Evolution[];
};

export type Evolution = {
  num: string;
  name: string;
};
