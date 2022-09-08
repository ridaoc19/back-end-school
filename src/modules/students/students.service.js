const Users = require("../users/users.models");
const Students = require("./students.models");

module.exports = {
  async putStudent(req, res) {
    try {
      let put = await Students.update(
        {
          firstNames: req.body.firstNames,
          lastName: req.body.lastName,
          dniStudent: req.body.dniStudent,
          birthDate: req.body.birthDate,
          courseIdCourse: req.body.courseIdCourse,
        },
        {
          where: {
            idStudent: req.body.idStudent,
          },
        }
      );

      res.status(200).json(put);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

  async deleteStudent(req, res) {
    let { idStudent } = req.body;
    try {
      let search = await Students.findByPk(idStudent);

      if (search.active) {
        // search = "false",
        await Students.update({ active: false },{ where: { idStudent: idStudent } }
        );
      } else {
        // search = "true",
        await Students.update({ active: true },{ where: { idStudent: idStudent } });
      }
      res.status(200).json(search);
      
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

};
