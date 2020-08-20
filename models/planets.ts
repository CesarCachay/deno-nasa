import { BufReader, join, parse, pick } from "../deps.ts";

type Planet = Record<string, string>;

let planets: Array<Planet>;

export const filterHabitablePlanets = (planets: Array<Planet>) => {
  return planets.filter((planet) => {
    const planetaryRadius = Number(planet["koi_prad"]);
    const stellarMass = Number(planet["koi_smass"]);
    const stellarRadius = Number(planet["koi_srad"]);

    return planet["koi_disposition"] === "CONFIRMED" &&
      planetaryRadius > 0.5 && planetaryRadius < 1.5 &&
      stellarMass > 0.78 && stellarMass < 1.04 &&
      stellarRadius > 0.99 && stellarRadius < 1.01;
  });
};

const loadPlanetsData = async () => {
  // We use the function join to build the correct path
  // because the paths in macOS/Linux/Windows are totally different
  const path = join("data", "kepler_exoplanets_nasa.csv");

  const file = await Deno.open(path);
  const bufReader = new BufReader(file);
  const result = await parse(bufReader, {
    header: true,
    comment: "#",
  });

  // Is necessary to close after use Deno.open otherwise the program will crash.
  Deno.close(file.rid);

  const planets = filterHabitablePlanets(result as Array<Planet>);

  return planets.map((planet) => {
    return pick(planet, [
      "koi_prad",
      "koi_smass",
      "koi_srad",
      "kepler_name",
      "koi_count",
      "koi_steff",
    ]);
  });
};

planets = await loadPlanetsData();

console.log(`${planets.length} habitable planets found!`);

export const getAllPlanets = () => {
  return planets;
};
