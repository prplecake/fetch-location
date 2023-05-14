export async function fetchGridPoints(latitude: string, longitude: string) {
  return await fetch('https://api.weather.gov/points').then((response) => {
    response.json();
  })
}