const degreeToRadians = (value) => {
  return (value / 180) * Math.PI;
};

const distance = (lat1, lng1, lat2, lng2) => {
  // calcul du rayon de la terre: 40000 km/(2*Math.PI)
  let rayonTerre = 6366;
  //   let rayonTerre = Math.pow(6371, 1);
  let radLat1 = degreeToRadians(lat1);
  let radLng1 = degreeToRadians(lng1);
  let radLat2 = degreeToRadians(lat2);
  let radLng2 = degreeToRadians(lng2);

  let distanceLongitude = radLng2 - radLng1;
  let distanceLatitude = radLat2 - radLat1;
  // récupération altitude en km
  //   alt1 = alt1 / 1000;
  //   alt2 = alt2 / 1000;

  let altitude =
    Math.pow(Math.sin(distanceLatitude / 2), 2) +
    Math.cos(radLat1) *
      Math.cos(radLat2) *
      Math.pow(Math.sin(distanceLongitude / 2), 2);

  let distanceKm = 2 * Math.atan2(Math.sqrt(altitude), Math.sqrt(1 - altitude));

  // retourne en km
  let round = rayonTerre * distanceKm;
  return round.toFixed(2);
};

export { distance, degreeToRadians };
