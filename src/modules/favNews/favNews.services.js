const Users = require("../users/users.models");
const FavNews = require("../favNews/favNews.models");
const News = require("../news/news.models");

module.exports = {
  // Crea Notificacion
  async addFavNews(req, res) {
    FavNews.create({
      creationDate: Date.now(),
      fav_news: req.body.fav_news,  // id de el q crea la notificacion
    })
      .then(async (news) => {
        res.status(200).json([news]);
      })
      .catch((error) => res.status(400).json({ error: error }));
  },

  async getAllFavNews(req, res) {
    try {
      let allNews = await FavNews.findAll({
        include: [
          {model: News, as: "favorites"}
        ],
      });
      res.status(200).json(allNews);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};
