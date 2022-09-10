const app = require("./app");
const sequelize = require("./src/core/database/db.js");
const Course = require("./src/modules/course/course.models");
const TypeUsers = require("./src/modules/typeusers/typeusers.models");
const { courses, typeusers } = require("./src/core/constants/firstTables.js");

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log(`http://localhost:${PORT}`);

  sequelize
    .sync({ force: false })
    .then(async () => {
      const size_CourseDb = await Course.count();
      if (!size_CourseDb) await Course.bulkCreate(courses);

      const size_TypeUserDb = await TypeUsers.count();
      if (!size_TypeUserDb) await TypeUsers.bulkCreate(typeusers);

      console.log("Nos hemos conectado a la base de datos");
    })
    .catch((error) => {
      console.log("Se ha producido un error", error);
    });
});
