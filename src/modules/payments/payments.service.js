const Users = require("../users/users.models");
const Payments = require("./payments.models");

module.exports = {
    // CREAR USUARIO
    async newPayment(req, res, next) {
      let { detail, amount, state, user } = req.body;
      console.log(req.body)
  
      try {
        let createPayment = await Payments.create({
            detail,
            amount,
            state,
            paymentDate: Date.now()
        });
        
        createPayment.addUsers("1")
  
        res.status(200).json(createPayment);
  
      } catch (error) {
        res.status(404).json({ error: error.messages });
        next();
      }
    },
}
  