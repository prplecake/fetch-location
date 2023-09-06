"use client";


import React, {useEffect, useState} from "react";
import {fetchGridPoints, fetchWeatherStations} from "../lib/api";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import {FeatureCollection} from "geojson";

export interface GridPoints {
  X: number,
  Y: number
}

const Page = () => {
  const [position, setPosition] = useState<GeolocationPosition>(undefined);
  const [gridPoints, setGridPoints] = useState<GridPoints>(null);
  const [weatherOffice, setWeatherOffice] = useState<string>("");
  const [weatherStations, setWeatherStations] = useState<FeatureCollection>(null);
  const copyCoords = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.target as HTMLButtonElement;
    const latitude = position.coords.latitude.toFixed(4);
    const longitude = position.coords.longitude.toFixed(4);
    navigator.clipboard.writeText(`${latitude}, ${longitude}`)
      .then(() => {
        toast("Copied to clipboard!");
      });
    const oldBtnHTML = btn.innerHTML;
    btn.innerHTML = "Copied!";
    setTimeout(() => {
      btn.innerHTML = oldBtnHTML;
    }, 2000);
  };
  const copyGridPoints = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.target as HTMLButtonElement;
    navigator.clipboard.writeText(`${gridPoints.X},${gridPoints.Y}`)
      .then(() => {
        toast("Copied to clipboard!");
      });
    const oldBtnHTML = btn.innerHTML;
    btn.innerHTML = "Copied!";
    setTimeout(() => {
      btn.innerHTML = oldBtnHTML;
    }, 2000);
  };

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
    if (gridPoints !== null && weatherOffice !== "") {
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
            {weatherStations.features.map((feat) => (
              <li
                key={feat.properties.stationIdentifier}>
                <a href={`https://forecast.weather.gov/zipcity.php?inputstring=${feat.properties.stationIdentifier}`} target={"_blank"}>
                  {feat.properties.stationIdentifier}
                </a> - {feat.properties.name}
              </li>
            ))}
          </ol>
        </details>
      </>) : (<>
        Loading...
      </>)}
      <ToastContainer
        position={"bottom-left"}
        theme={"dark"}
      />
    </div>
  );
};
export default Page;