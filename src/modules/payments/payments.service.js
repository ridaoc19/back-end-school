const Users = require("../users/users.models");
const Payments = require("./payments.models");
const Stripe = require("stripe")
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

      async stripe(req, res, next) {
        const stripe = new Stripe("sk_test_51LhTr6LwTZHQim7Futl0Lrp6symEoFn9UEdjUflDyUa1EemzpCJ8YMKZVHcCMOfRIjsCZIGoFqAPHa6PSJXAieYJ00FRCfJwEG")
      console.log(req.body);

      const { id, amount } = req.body;

     const payment = await stripe.paymentIntents.create({
        amount,
        currency: "USD",
        description: "museo",
        payment_method: id,
        confirm: true
      })

      console.log(payment)




      res.status(200).json(`se pago ${payment}`)
    }
}
  