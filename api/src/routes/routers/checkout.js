const { Router } = require("express");
const router = Router();
const { MercadoPagoConfig, Payment, Preference } = require("mercadopago");
const client = new MercadoPagoConfig({ accessToken: "" });
const payment = new Payment(client);

const pagoMl = async (req, res, next) => {
  try {
    const body = {
      items: [
        {
          title: req.body.tile,
          quantity: Number(req.body.quantity),
          unit_price: Number(req.body.price),
          currency_id: "ARS",
        },
      ],
      back_urls: {
        success: "http://localhost:3000/home",
        failure: "http://localhost:3000/",
        pending: "http://localhost:3000/home",
      },
    };
    const preference = new Preference(client);
    const result = await preference.create({ body });
    return res.json({ id: result.id });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
router.post("/", pagoMl);
module.exports = router;

// clase constantes
// mp101 mercado pago no se valido
// return res.status(500).json{TYPE.mercadopago}
