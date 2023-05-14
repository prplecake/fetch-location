'use client';


import {useEffect, useState} from "react";

export default function Page() {
  const [position, setPosition] = useState<GeolocationPosition>(undefined);
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

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) =>
      setPosition(position));
  }, []);

  return (
    <div className="main">
      Your location:
      {position !== undefined ? (
        <p>Coords: {position.coords.latitude.toFixed(4)}, {position.coords.longitude.toFixed(4)}
          &nbsp;<button onClick={copyCoords}>Copy</button>
        </p>
      ) : (
        <>
          Loading...
        </>
      )}
    </div>
  );
}