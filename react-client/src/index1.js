// {G95NM9ub2PbsLEkAdp1uKXv3xul1: {…}}
// G95NM9ub2PbsLEkAdp1uKXv3xul1:
const obj = {
  G95NM9ub2PbsLEkAdp1uKXv3xul1: {
    M90BuBa61hobnWkD9xw: {
      title: "Djjfjfjdjejjdjdjd",
      url:
        "https://firebasestorage.googleapis.com/v0/b/location-app-5d3d8.appspot.com/o/Djjfjfjdjejjdjdjd?alt=media&token=2fd61384-69b5-4fbb-9517-ec1b49eb8151",
      userEmail: "rdick@ualberta.ca"
    }
  }
};

// title: "Djjfjfjdjejjdjdjd"
// url: "https://firebasestorage.googleapis.com/v0/b/location-app-5d3d8.appspot.com/o/Djjfjfjdjejjdjdjd?alt=media&token=2fd61384-69b5-4fbb-9517-ec1b49eb8151"
// userEmail: "rdick@ualberta.ca"

// -M90DGBk1a9e0WaF6giH: {title: "Jfjejenndd", url: "https://firebasestorage.googleapis.com/v0/b/locati…=media&token=51c64d0e-dbc0-42c6-be01-5a0a748b1121", userEmail: "rdick@ualberta.ca"}
// -M90IxaT48xggJPrrGIH: {title: "Fjjfjf", url: "https://firebasestorage.googleapis.com/v0/b/locati…=media&token=213e6493-b3fe-4f06-9613-bbd4105c5628", userEmail: "rdick@ualberta.ca"}
// -M909WyYZgS7He057MkZ: {title: "Akshaydjdj", url: "[object Object]", userEmail: "rdick@ualberta.ca"}

const parsedData = Object.keys(obj);

for (let [key, value] of Object.entries(obj)) {
  //console.log(value);
  for (let [key1, value1] of Object.entries(value)) {
    console.log(value1.title);
  }
}
let location = { coords: { latitude: "", longitude: "" } };

//console.log(parsedData);
