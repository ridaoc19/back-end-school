const express = require('express');
const router = express.Router();

// REALCIONES
require("./src/core/database/relations/associations")

// RUTAS
router.use('/course', require('./src/modules/course/course.controller.js'));
router.use('/students', require('./src/modules/students/students.controller.js'));
router.use('/typeusers', require('./src/modules/typeUsers/typeUsers.controller.js'));
router.use('/users', require('./src/modules/users/users.controller.js'));

module.exports = router;


