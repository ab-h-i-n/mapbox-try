"use client";
import React from "react";
import ReactMapboxGl, { Marker } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Room } from "@mui/icons-material";

// Initialize the map with your access token
const MapboxMap = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiYWJoaW4yazMiLCJhIjoiY20wbWh5ZHFwMDJwcjJqcHVjM3kyZjZlNyJ9.cagUWYMuMzLdJQhMbYB50A",
});

const MapComponent = () => {
  return (
    <MapboxMap
      style="mapbox://styles/mapbox/streets-v9"
      containerStyle={{
        height: "100vh",
        width: "100vw",
        zIndex: 999,
      }}
      center={[-0.481747846041145, 51.3233379650232]}
      zoom={[15]}
    >
      <Marker
        className={'z-[1000]'}
        coordinates={[-0.481747846041145, 51.3233379650232]}
        anchor="bottom"
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            backgroundColor: "tomato",
            borderRadius: "50%",
          }}
        />
      </Marker>
    </MapboxMap>
  );
};

export default MapComponent;
