const { Review, Users, Posts, Orders } = require("../db");

async function createReview(req, res, next) {
  const { rating, comment, user, post } = req.body;
  const order = await Orders.findAll({
    where: {
      userId: user,
      postId: post,
    },
  });
  if (!order.length)
    return res.status(500).json({
      message:
        "no puedes hacer una review de una publicacion q no has comprado",
    });
  try {
    const newReview = await Review.create({
      description: comment,
      qualification: parseInt(rating),
    });
    const userBd = await Users.findByPk(user);
    const postBd = await Posts.findByPk(post);
    await newReview.setUser(userBd);
    await newReview.setPost(postBd);

    const allorder = await Orders.findAll({
      where: { userId: user },
      include: [
        { model: Users, attributes: ["username", "id", "email", "image"] },
        {
          model: Posts,
          attributes: ["id", "title", "image", "duration", "cost", "rating"],
          include: [
            {
              model: Review,
              where: { userId: user },
              required: false,
              attributes: [
                "id",
                "qualification",
                "description",
                "createdAt",
                "aprobado",
              ],
            },
          ],
        },
      ],
    });
    console.log(allorder);
    if (postBd.rating === 0) {
      postBd.rating = Number(newReview.qualification);
      await postBd.save();
      return res.json(allorder);
    }
    postBd.rating = Number(Math.round((postBd.rating + Number(rating)) / 2));
    await postBd.save();
    return res.json(allorder);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "No se puedo crear la Review", error: err });
  }
}

async function deleteReview(req, res) {
  const { idReview } = req.params;
  if (!idReview)
    return res
      .status(401)
      .json({ message: "No se encontro id para la review" });
  try {
    Review.destroy({
      where: {
        id: idReview,
      },
    });
    res.status(200).send("Review eliminado");
  } catch (err) {
    return res
      .status(500)
      .json({ message: "no se pudo borrar la Review", err });
  }
}

async function updateReview(req, res, next) {
  const { idReview } = req.params;
  const { qualification, description } = req.body;
  if (!idReview || !qualification || !description)
    return res.status(401).json({ message: "Parametros no recibidos" });
  try {
    const review = await Review.findByPk(idReview);
    review.qualification = qualification;
    review.description = description;
    review.save();
    return res.json(review);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "No se pudo editar la Review", err });
  }
}

async function getAllReviewsUser(req, res, next) {
  const { id } = req.params;
  if (!id)
    return res
      .status(401)
      .json({ message: "No se recibio la id user en Reviews" });
  try {
    const allReviews = await Review.findAll({
      include: [
        {
          model: Posts,
          where: { user_id: id },
          attributes: [
            "id",
            "title",
            "description",
            "rating",
            "duration",
            "cost",
            "createdAt",
          ],
          order: [["createdAt", "DESC"]],
        },
        {
          model: Users,
          attributes: ["username", "email", "image"],
          order: [["createdAt", "DESC"]],
        },
      ],
    });
    return res.json(allReviews);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

async function getPostReview(req, res, next) {
  // el id es el del POST,
  let { idPost } = req.params;
  if (idPost) {
    // 36 es la length del UUID
    try {
      let foundPost = await Posts.findOne({
        where: {
          id: idPost,
        },
        attributes: ["id"],
        include: [
          {
            model: Review,
            attributes: ["qualification", "description"],
            order: [["createdAt", "DESC"]],
            include: [
              {
                model: Users,
                attributes: ["username"],
              },
            ],
          },
        ],
      });
      if (foundPost) res.json(foundPost);
      else
        throw new Error(
          "ERROR 500: La publicación no fue encontrada en la base de datos (UUID no existe)."
        );
    } catch (err) {
      next(err);
    }
  }
  if (idPost && idPost.length !== 36) {
    try {
      throw new TypeError(
        "ERROR 404: ID inválido (ID no es un tipo UUID válido)."
      ); // automaticamente rechaza un error, sin buscar por la DB
    } catch (err) {
      next(err);
    }
  }
}

module.exports = {
  createReview,
  deleteReview,
  updateReview,
  getAllReviewsUser,
  getPostReview,
};
