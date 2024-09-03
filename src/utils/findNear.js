import { hospitals } from "@/data/hospitals";

export const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Radius of the Earth in kilometers

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
};

export const findNearestHospital = async (userLocation) => {
  let nearestHospital = null;
  let shortestDistance = Infinity;

  hospitals.forEach((hosp) => {
    const distance = haversineDistance(
      userLocation.lat,
      userLocation.lng,
      hosp.latitude,
      hosp.longitude
    );
    if (distance < shortestDistance) {
      shortestDistance = distance;
      nearestHospital = hosp;
    }
  });

  return nearestHospital;
};