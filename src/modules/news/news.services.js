const Users = require("../users/users.models");
const News = require("../news/news.models");
const TypeUsers = require("../typeUsers/typeUsers.models");

module.exports = {
  // Crea Notificacion
  async createNews(req, res) {
    News.create({
      title: req.body.title,
      body: req.body.body,
      creationDate: Date.now(),
      active: true,
      users_news: req.body.users_news,  // id de el q crea la notificacion
    })
      .then(async (news) => {
        res.status(200).json([news]);
      })
      .catch((error) => res.status(400).json({ error: error }));
  },

  async getAllNews(req, res) {
    try {
      let allNews = await News.findAll({
        include: [
          {model: Users, as: "poster", include: [{model: TypeUsers}]}
        ],
      });
      res.status(200).json(allNews);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};
