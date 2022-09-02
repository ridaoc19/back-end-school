
const app = require('./app');
const sequelize = require('./src/core/database/db.js');

// Setting
const PORT = process.env.PORT || 3000;


// Arrancamos el servidor
app.listen(PORT, function () {
  console.log(`http://localhost:${PORT}`);

  // Conectase a la base de datos
  sequelize.sync({ force: false }).then(() => {
      console.log("Nos hemos conectado a la base de datos");
  }).catch(error => {
      console.log('Se ha producido un error', error);
  })

});
