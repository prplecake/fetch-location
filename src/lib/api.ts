import {GridPoints} from "../app/page";
import {Feature, FeatureCollection} from "geojson";

export const fetchGridPoints = async (latitude: string, longitude: string): Promise<Feature> => {
  return await fetch("https://api.weather.gov/points/"+latitude+","+longitude).then(
    (response) => response.json());
};

export const fetchWeatherStations = async (cwa: string, gridPoints: GridPoints): Promise<FeatureCollection> => {
  return await fetch(`https://api.weather.gov/gridpoints/${cwa}/${gridPoints.X},${gridPoints.Y}/stations`).then(
    (response) => response.json());
};
