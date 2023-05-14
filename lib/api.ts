export async function fetchGridPoints(latitude: string, longitude: string) {
  return await fetch('https://api.weather.gov/points/'+latitude+','+longitude).then(
    (response) => response.json());
}