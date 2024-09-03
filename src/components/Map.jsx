"use client";
import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { hospitals } from "@/data/hospitals";
import { findNearestHospital } from "@/utils/findNear";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYWJoaW4yazMiLCJhIjoiY20wbWh5ZHFwMDJwcjJqcHVjM3kyZjZlNyJ9.cagUWYMuMzLdJQhMbYB50A";

const Map = () => {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);

  const createMarker = (lngLat, iconUrl, instance) => {
    const el = document.createElement("img");
    el.src = iconUrl;
    el.style.width = "52px";
    el.style.height = "52px";

    new mapboxgl.Marker(el).setLngLat(lngLat).addTo(instance);
  };

  const createMarkerForHospitals = () => {
    hospitals.forEach((hosp) => {
      createMarker([hosp.longitude, hosp.latitude], "/hospital.svg", map);
    });
  };

  const handleLocationError = (error) => {
    console.error("Error getting user's location:", error);
  };

  const setDirection = async (mapInstance, userLocation) => {
    const nearestHospital = await findNearestHospital(userLocation);
    if (nearestHospital) {
      // Add Directions control
      const directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        unit: "metric",
        profile: "mapbox/driving",
      });

      mapInstance.addControl(directions, "top-left");

      directions.setOrigin([userLocation.lng, userLocation.lat]);

      setTimeout(() => {
        directions.setDestination([
          nearestHospital.longitude,
          nearestHospital.latitude,
        ]);
      }, 3000);
    }
  };

  const setUserLocation = (position) => {
    const { latitude, longitude } = position.coords;
    console.log({ lng: longitude, lat: latitude });

    // const userLocation = { lng: longitude, lat: latitude };
    const userLocation = { lng: 76.2556, lat: 9.92522 };

    const mapInstance = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [userLocation.lng, userLocation.lat],
      zoom: 15,
    });

    setMap(mapInstance);

    createMarker(
      [userLocation.lng, userLocation.lat],
      "/ambulance.svg",
      mapInstance
    );

    setDirection(mapInstance, userLocation);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        setUserLocation,
        handleLocationError
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (map) {
      createMarkerForHospitals();
    }
  }, [map]);

  return <div ref={mapContainer} style={{ width: "100vw", height: "100vh" }} />;
};

export default Map;
