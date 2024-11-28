const { where } = require("sequelize");
const { Orders, Users, Posts, Payments } = require("../db");

const getAllOrden = async (req, res, next) => {
  const allOrden = await Orders.findAll({
    include: [
      { model: Users, order: [["createdAt", "DESC"]] },
      { model: Posts, order: [["createdAt", "DESC"]] },
      { model: Payments },
    ],
  });
  if (!allOrden) return res.status(500).json({ message: "no hay ordenes" });
  res.json(allOrden);
};
const getOrdenbyId = async (req, res, next) => {
  const { id } = req.params;
  if (!id) return res.status(401).json({ message: "No se encontro el ID" });
  const order = await Orders.findAll({
    include: [
      {
        model: Users,
        attributes: ["username", "email", "image", "country"],
      },
      {
        model: Posts,
        where: { user_id: id },
        attributes: ["title", "image", "description", "cost", "duration","rating"],
      },
      { model: Payments },
    ],
  });
  if (!order.length)
    return res.json({ message: "El usuario no tiene ordenes" });
  return res.json(order);
};

const createOrden = async (req, res, next) => {
  const carrito = req.body.carrito;
  const ordenes = [];
  for (let i in carrito) {
    const { user_id, post_id, title, price } = carrito[i];
    try {
      const newOrder = await Orders.create({
        title,
        price: Number(price),
      });
      const user = await Users.findByPk(user_id);
      const post = await Posts.findByPk(post_id);
      const dueño = post.user_id;
      if (dueño === user_id)
        return res
          .status(500)
          .json({ message: "no podes comprar tu misma publicacion C:" });

      if (!user && !post)
        return res.status(500).json({ message: "user o post invalido" });
      await newOrder.setUser(user);
      await newOrder.setPost(post);
      ordenes.push(newOrder);
    } catch (err) {
      res
        .status(500)
        .json({ message: "error no se pudo crear orden", error: err.message });
    }
  }
  return res.send(ordenes);
};
const editOrden = async (req, res, next) => {
  const id = req.body.id;
  const change = req.body;
  try {
    const orden = await Orders.update(change, { where: { id } });
    return res.json(orden); //devuelve 1 si funciona nose por que xD
  } catch (e) {
    res
      .status(500)
      .json({ message: "no se pudo editar la orden", error: e.message });
  }
};
const cancelOrden = async (req, res, next) => {
  const id = req.body.id;
  try {
    const orden = await Orders.findByPk(id);
    orden.status = "cancelled";
    await orden.save();
    return res.json(orden);
  } catch (e) {
    res.status(500).json({ message: "algo salio mal", error: e.message });
  }
};

async function getVentas(req, res, next) {
  const user = req.params.id;
  if (!user)
    return res.status(401).json({ message: "No se encontro id de usuario" });
  const ventas = await Orders.findAll({
    where: { userId: user },
    include: [
      {
        model: Users,
        attributes: ["username", "name", "email", "country", "image"],
      },
      {
        model: Posts,
        attributes: [
          "title",
          "description",
          "duration",
          "cost",
          "rating",
          "image",
        ],
      },
    ],
  });
  if (!ventas.length)
    return res.json({ message: "el usuario seleccionado no tiene ventas" });
  return res.json(ventas);
}

module.exports = {
  getOrdenbyId,
  createOrden,
  editOrden,
  cancelOrden,
  getAllOrden,
  getVentas,
};
