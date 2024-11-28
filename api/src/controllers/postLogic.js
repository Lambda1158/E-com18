const { Posts, Users, Categories, Review } = require("../db");

const getPosts = async (req, res, next) => {
  const post = await Posts.findAll({
    include: [
      {
        model: Users,
        order: [["createdAt", "DESC"]],
      },
      { model: Review, order: [["createdAt", "DESC"]] },
      {
        model: Categories,
        attributes: ["title"],
        order: [["createdAt", "DESC"]],
      },
    ],
  });
  if (!post)
    return res.status(404).json({ message: "No se encontro ningun post" });
  return res.status(200).json(post);
};

const getUserPost = async (req, res, next) => {
  const { id } = req.params;
  if (!id) return res.status(404).json({ message: "id no encontrado" });
  try {
    const posts = await Posts.findAll({
      where: {
        user_id: id,
      },
      include: [
        {
          model: Users,
        },
        {
          model: Review,
        },
        {
          model: Categories,
          attributes: ["title"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return res.json(posts);
  } catch (error) {
    console.error("Error al traer post de un user:", error);
    return res.status(500).json({
      message: "Algo salió mal",
      error: error.message,
    });
  }
};

const createPost = async (req, res, next) => {
  const {
    title,
    description,
    duration,
    cost,
    username,
    timeZone,
    language,
    category,
  } = req.body;
  const file = req.file;
  if (!file) {
    return res
      .status(400)
      .json({ message: "Imagen no encontrada en la solicitud" });
  }
  const path = "http://localhost:3001/" + file.filename;
  try {
    // Verificar existencia de usuario
    const user = await Users.findOne({ where: { username } });
    if (!user) return res.status(404).json({ message: "Usuario inválido" });

    // Verificar existencia de categoría
    const categoryDB = await Categories.findOne({ where: { title: category } });
    if (!categoryDB)
      return res.status(404).json({ message: "Categoría inválida" });

    // Crear el post
    const post = await Posts.create({
      title,
      description,
      category,
      timeZone,
      language,
      duration: Number(duration),
      cost: Number(cost),
      image: [path],
    });

    // Relacionar post con categoría y usuario
    await post.setCategory(categoryDB);
    await post.setUser(user);
    return res.json(post);
  } catch (error) {
    console.error("Error al crear el post:", error);
    return res.status(500).json({
      message: "Algo salió mal",
      error: error.message,
    });
  }
};

const updatePost = async (req, res, next) => {
  const { title, description, duration, cost, id, timeZone, language, user } =
    req.body;
  if (!id) {
    return res.status(400).json({ message: "El ID del post es obligatorio" });
  }
  try {
    const post = await Posts.findByPk(id);
    if (!post) {
      return res
        .status(404)
        .json({ message: `No se encontró ningún post con el ID ${id}` });
    }
    const updatedFields = {
      ...(title && { title }),
      ...(description && { description }),
      ...(duration && { duration }),
      ...(cost && { cost }),
      ...(timeZone && { timeZone }),
      ...(language && { language }),
    };
    await post.update(updatedFields);
    const userPosts = await Posts.findAll({
      where: { user_id: user },
      include: [
        { model: Users },
        { model: Review },
        { model: Categories, attributes: ["title"] },
      ],
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json(userPosts);
  } catch (error) {
    console.error("Error al actualizar el post:", error);
    return res.status(500).json({
      message: "Ocurrió un error al actualizar el post",
      error: error.message,
    });
  }
};

const deletePost = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  if (!id) {
    return res.status(400).json({ message: "Id no encontrado" });
  }
  try {
    const deletedCount = await Posts.destroy({
      where: {
        id: id, // Condición para encontrar el registro
      },
    });

    if (deletedCount === 0) {
      return res.status(404).json({ message: "Post no encontrado" });
    }
    return res.status(200).json({ message: "Post eliminado exitosamente" });
  } catch (error) {
    return res.status(500).json({
      message: "Error al eliminar el post",
      error: error.message,
    });
  }
};

const addImage = async (req, res, next) => {
  const { id } = req.body;
  const file = req.file;
  const path = "https://localhost:3001/" + file.filename;
  const post = await Posts.findByPk(id);
  if (!post)
    res.status(500).json({
      message: "post no encontrado",
    });
  try {
    post.image = [...post.image, path];
    post.save();
    return res.json(post);
  } catch (e) {
    return res.status(500).json({
      message: "algo salio mal",
      error: e.message,
    });
  }
};

const deleteImage = async (req, res, next) => {
  const { image, id } = req.body;
  const post = await Posts.findByPk(id);
  if (!post) return res.status(500).json({ message: "No se contro post" });
  try {
    post.image = post.image.filter((e) => e != image);
    post.save();
    return res.json(post);
  } catch (e) {
    return res.status(500).json({
      message: "algo salio mal",
      error: e.message,
    });
  }
};

async function getPostId(req, res, next) {
  const { id } = req.params;
  if (!id)
    return res
      .status(500)
      .json({ message: "Id invalido no se encontro ningun post" });
  try {
    const gotId = await Posts.findOne({
      where: {
        id: id,
      },
      attributes: [
        "title",
        "description",
        "image",
        "duration",
        "oferta",
        "cost",
        "rating",
        "timeZone",
        "language",
        "id",
        "user_id",
      ],
      include: [
        {
          model: Users,
          attributes: ["id", "username", "country", "image"],
          order: [["createdAt", "DESC"]],
        },
        {
          model: Categories,
          attributes: ["id", "title"],
          order: [["createdAt", "DESC"]],
        },
        {
          model: Review,
          attributes: ["qualification", "description"],
          order: [["createdAt", "DESC"]],
        },
      ],
    });
    return res.json(gotId);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error en encontrar el post by ID" });
  }
}
const getTalentsByTitle = async (req, res, next) => {
  const title = req.params.title;
  if (!title) return res.status(500).json({ message: "No se encontro titulo" });
  try {
    const post = await Posts.findAll({
      include: [
        {
          model: Users,
          attributes: ["username"],
        },
        {
          model: Categories,
          attributes: ["title"],
        },
      ],
    });
    const array = post.filter((e) =>
      e.title.toLowerCase().includes(title.toLowerCase())
    );
    // if(array.length < 1) return res.status(400).json({message:"no se encontro talento con ese titulo"})
    res.json(array);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "No se pudo encontrar talento por titulo" });
  }
};

const getTalentosporRating = async (req, res, next) => {
  const modo = req.params.modo;
  let post;
  if (modo === "asc") {
    post = await Posts.findAll({
      include: [
        {
          model: Users,
          attributes: ["username"],
        },
        {
          model: Categories,
          attributes: ["title"],
        },
      ],
    });
    post.sort(function (a, b) {
      if (a.rating > b.rating) return 1;
      if (b.rating > a.rating) return -1;
      return 0;
    });
    res.json(post);
  }
  post = await Posts.findAll({
    include: [
      {
        model: Users,
        attributes: ["username"],
      },
      {
        model: Categories,
        attributes: ["title"],
      },
    ],
  });
  post.sort(function (a, b) {
    if (a.rating > b.rating) return -1;
    if (b.rating > a.rating) return 1;
    return 0;
  });
  res.json(post);
};

module.exports = {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  addImage,
  deleteImage,
  getTalentsByTitle,
  getPostId,
  getTalentosporRating,
  getUserPost,
};
