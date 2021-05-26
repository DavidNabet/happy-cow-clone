// Math.atan2 ===> renvoie l'arc tangeante du quotient de ses arguments, voir la doc : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Math/atan2
// Math.asin() ====> renvoie l'arc sinus d'un nombre (en radians).
// Voir la doc https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Math/asin
// Math.sqrt() ====> renvoie la racine carrée d'un nombre
// Math.pow() ===> renvoie un nombre à une certaine puissance (base, expression);

// calcul des degrées en Radians
export const degreeToRadians = (value) => {
  return (value / 180) * Math.PI;
};

export const radiansToDegrees = (value) => {
  return (value * 180) / Math.PI;
};

// φ is latitude, λ is longitude, R is earth’s radius (mean radius = 6,371km);
// note that angles need to be in radians to pass to trig functions!
// Formule Haversine

// lat1, lng1 ===> représente la localisation du user
// lat2, lng2 ===> les coordonnées gps d'un marker
// Implémentation de la distance en vol d'oiseau séparant 2 points ou coordonnées GPS
export const distance = (lat1, lng1, lat2, lng2) => {
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
  return rayonTerre * distanceKm;
};

export const haversine = (maPosition, data, rayon) => {
  // maPosition = [48.856614, 2.3522219];

  // let locations = [
  //   { lng: 2.306483, lat: 48.856312 },
  //   { lng: 2.324403, lat: 48.841038 },
  //   { lng: 2.355737, lat: 48.852036 },
  //   { lng: 2.34617, lat: 48.863556 },
  //   { lng: 2.343648, lat: 48.883675 },
  // ];

  let tab = [];
  let dist;
  // locationRestos = data[i].locations.lat
  for (let i = 0; i < data.length; i++) {
    dist = distance(
      maPosition[0],
      maPosition[1],
      data[i].locations.lat,
      data[i].locations.lng
    );

    if (dist <= rayon) {
      tab.push(locationRestos[i]);
    }
  }
  return tab;
};

// console.log(haversine(4));
