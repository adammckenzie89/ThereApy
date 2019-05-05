const addFavorite = (req, res) => {
  const dbInstance = req.app.get("db");
  const {
    name,
    formatted_address,
    formatted_phone_number,
    website,
    rating,
    img,
    id
  } = req.body;
  console.log(req.body);
  dbInstance
    .addFavorites([
      name,
      formatted_address,
      formatted_phone_number,
      website,
      rating,
      img,
      id
    ])
    .then(() =>
      res.json(
        name,
        formatted_address,
        formatted_phone_number,
        website,
        rating,
        img,
        id
      )
    )
    .catch(error => {
      res.status(500).json({ errorMessage: "nope" });
      console.log(error);
    });
};

const joinFavorites = async (req, res) => {
  const dbInstance = req.app.get("db");
  const result = await dbInstance.joinFavorites();
  console.log(result);
  res.json(result);
};

module.exports = {
  addFavorite,
  joinFavorites
};
