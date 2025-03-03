const { Router } = require('express');
const router = Router();
const { MercadoPagoConfig, Preference, Payment } = require('mercadopago');
const { MPTOKEN } = process.env;
const mercadopago = new MercadoPagoConfig({ accessToken: MPTOKEN });
const transformItems = (items) => {
  return items.map((item) => ({
    title: item.title,
    quantity: item.quantity || 1,
    unit_price: item.cost || 0,
    currency_id: 'ARS',
  }));
};

const pagoMl = async (req, res) => {
  try {
    const body = {
      items: transformItems(req.body),
      back_urls: {
        success: 'http://localhost:3000/home',
        failure: 'http://localhost:3000/',
        pending: 'http://localhost:3000/home',
      },
    };
    const result = await new Preference(mercadopago).create({
      body,
    });
    res.json({ redirectUrl: result.init_point });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const validarPago = async (req, res) => {
  try {
    const payment = await new Payment(mercadopago).get({
      id: req.body.data.id,
    });
    if (payment.status === 'approved') {
      return res.json({ message: 'Todo bien' });
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: error.message });
  }
};
router.post('/', pagoMl);
router.post('/pagos', validarPago);
module.exports = router;
