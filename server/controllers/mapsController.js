//SEARCH METHODS
const axios = require("axios");

const { KEY } = process.env;

const userLocation = async (req, res) => {
  const { lat, lng } = req.body;
  axios
    .get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=24140.2&type=doctor&keyword=counseling&keyword=therapy&keyword=mentalhealth&key=${KEY}`
    )
    .then(async response => {
      // console.log(response.data.results[1].photos);
      let placeData = [];
      for (let i = 0; i < response.data.results.length; i++) {
        let result = await axios
          .get(
            `https://maps.googleapis.com/maps/api/place/details/json?key=${KEY}&placeid=${
              response.data.results[i].place_id
            }`
          )
          .catch(err => console.log(err));
        placeData.push({
          result: result.data,
          photos: response.data.results[i].photos
            ? response.data.results[i].photos[0].photo_reference
            : null
        });
      }
      res.status(200).json(placeData);
    });
};

module.exports = {
  userLocation
};
