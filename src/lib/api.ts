import {GridPoints} from "../app/page";

export async function fetchGridPoints(latitude: string, longitude: string) {
  return await fetch("https://api.weather.gov/points/"+latitude+","+longitude).then(
    (response) => response.json());
}

export async function fetchWeatherStations(cwa: string, gridPoints: GridPoints) {
  return await fetch(`https://api.weather.gov/gridpoints/${cwa}/${gridPoints.X},${gridPoints.Y}/stations`).then(
    (response) => response.json());
}