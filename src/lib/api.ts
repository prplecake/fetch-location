import {GridPoints} from "../app/page";

export const fetchGridPoints = async (latitude: string, longitude: string) => {
  return await fetch("https://api.weather.gov/points/"+latitude+","+longitude).then(
    (response) => response.json());
};

export const fetchWeatherStations = async (cwa: string, gridPoints: GridPoints) => {
  return await fetch(`https://api.weather.gov/gridpoints/${cwa}/${gridPoints.X},${gridPoints.Y}/stations`).then(
    (response) => response.json());
};
