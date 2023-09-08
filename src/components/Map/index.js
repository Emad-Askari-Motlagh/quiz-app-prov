import React, { useEffect, useRef, useState } from "react";
import "./Map.scss";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
const geojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-77.032, 38.913],
      },
      properties: {
        title: "Mapbox",
        description: "Washington, D.C.",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-122.414, 37.776],
      },
      properties: {
        title: "Mapbox",
        description: "San Francisco, California",
      },
    },
  ],
};
mapboxgl.accessToken =
  "pk.eyJ1IjoiZW1hZGkiLCJhIjoiY2xtM3lxejQ4MTY3ZjNrcDlyMGMydXNmNiJ9.FLaY38F_p9GvuCj4bxhQQA";
const Map = ({ lng, lat }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef();
  const [zoom, setZoom] = useState(15);
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });
    new mapboxgl.Marker(marker).setLngLat([lng, lat]).addTo(map.current);
  });
  return (
    <div>
      <div ref={marker} className="marker"></div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
};

export default Map;
