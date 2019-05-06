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

const makePosts = async (req, res) => {
  const { content, favoritesid } = req.body;
  console.log("fav id for posts console log", favoritesid);
  const dbInstance = req.app.get("db");
  const result = await dbInstance.createPosts([content, favoritesid]);
  res.json(result);
};

const joinPosts = async (req, res) => {
  const dbInstance = req.app.get("db");
  const results = await dbInstance.returnPosts();
  res.json(results);
};

const deletePost = async (req, res) => {
  const dbInstance = req.app.get("db");
  console.log(req.params.id);
  const results = await dbInstance.deletePost(+req.params.id);
  res.json(results);
};

module.exports = {
  addFavorite,
  joinFavorites,
  makePosts,
  joinPosts,
  deletePost
};
