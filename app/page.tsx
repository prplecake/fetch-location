'use client';


import {useEffect, useState} from "react";
import {fetchGridPoints, fetchWeatherStations} from "../lib/api";

export interface GridPoints {
  X: number,
  Y: number
}

export default function Page() {
  const [position, setPosition] = useState<GeolocationPosition>(undefined);
  const [gridPoints, setGridPoints] = useState<GridPoints>(null);
  const [weatherOffice, setWeatherOffice] = useState<string>('');
  const [weatherStations, setWeatherStations] = useState(null);
  const copyCoords = (e) => {
    let btn = e.target;
    let latitude = position.coords.latitude.toFixed(4);
    let longitude = position.coords.longitude.toFixed(4);
    navigator.clipboard.writeText(`${latitude}, ${longitude}`);
    let oldBtnHTML = btn.innerHTML;
    btn.innerHTML = "Copied!";
    setTimeout(() => {
      btn.innerHTML = oldBtnHTML;
    }, 2000)
  }
  const copyGridPoints = (e) => {
    let btn = e.target;
    navigator.clipboard.writeText(`${gridPoints.X},${gridPoints.Y}`);
    let oldBtnHTML = btn.innerHTML;
    btn.innerHTML = "Copied!"
    setTimeout(() => {
      btn.innerHTML = oldBtnHTML;
    }, 2000);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) =>
      setPosition(position));
  }, []);

  useEffect(() => {
    if (position !== undefined) {
      fetchGridPoints(
        position.coords.latitude.toFixed(4),
        position.coords.longitude.toFixed(4)
      ).then((data) => {
        setGridPoints({
          X: data.properties.gridX,
          Y: data.properties.gridY
        });
        setWeatherOffice(data.properties.gridId);
      });
    }
  }, [position]);

  useEffect(() => {
    if (gridPoints !== null && weatherOffice !== '') {
      fetchWeatherStations(weatherOffice, gridPoints).then(
        (data) => setWeatherStations(data)
      );
    }
  }, [weatherOffice, gridPoints]);

  return (
    <div className="main">
      Your location:
      {position !== undefined ? (
        <p>Coords: {position.coords.latitude.toFixed(4)}, {position.coords.longitude.toFixed(4)}
          &nbsp;
          <button onClick={copyCoords}>Copy</button>
        </p>
      ) : (
        <>
          Loading...
        </>
      )}
      {gridPoints ? (
        <>
          <p>NWS Grid Points: {gridPoints.X},{gridPoints.Y}
            &nbsp;
            <button onClick={copyGridPoints}>Copy</button>
          </p>
        </>
      ) : null}
      {weatherStations ? (<>
        <details>
          <summary>Weather Stations</summary>
          <ol>
            {weatherStations.features.map((feat, i) => (
              <li
                key={feat.properties.stationIdentifier}>{feat.properties.stationIdentifier} - {feat.properties.name}</li>
            ))}
          </ol>
        </details>
      </>) : (<>
        Loading...
      </>)}
    </div>
  );
}