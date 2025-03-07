const { Users, Orders, Posts, Question, Review } = require("../db");
const { v4: uuidv4 } = require("uuid");
const { getToken, getTokenData } = require("../config/jwt.config");
const bcrypt = require("bcrypt");
const {
  getTemplate,
  sendEmail,
  sendEmailPassword,
  getTemplatePassword,
} = require("../config/mail.config");
const { token } = require("morgan");
const { where } = require("sequelize");

async function createUser(req, res, next) {
  let {
    username,
    password,
    name,
    lastName,
    birthdate, //"año/mes/dia"
    email,
    email_verified,
    country,
  } = req.body;
  // hacer un if donde si el email es "adminuser@admin.com", el isAdmin = true y isDataComplete = true
  //console.log(req.body)
  try {
    //-----VALIDACIONES-----
    if (!name) return res.send("Debe agregar un nombre");
    if (!lastName) return res.send("Debe agregar un apellido");
    if (!email) return res.send("Debe agregar un email");

    //Verificar que el username no exista
    const foundUser = await Users.findOne({ where: { username: username } });
    if (foundUser) {
      //return res.json({success:false, msg 'Usuario ya existe'})
      return res.send("El usuario ya existe");
    }
    //Verificar que el email no exista
    searchMail = await Users.findOne({ where: { email: email } });
    if (searchMail) return res.send("El email ya existe");

    //Verificar que sea un email
    let expReg =
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    let isValid = expReg.test(email);
    if (isValid === false) return res.send("El email no es valido");

    //Hashear contraseña
    let passwordHash = await bcrypt.hash(password, 10);

    //-----GENERAR EL CODIGO-------
    const code = uuidv4();

    //Si todo esta correcto, se crea el usuario
    const newUser = await Users.create({
      username: username,
      password: passwordHash,
      name: name,
      lastName: lastName,
      birthdate: birthdate,
      email: email,
      country: country,
      code: code,
    });

    //-----GENERAR TOKEN-----
    const token = getToken({ email, code });

    //-----OBTENER UN TEMPLATE-----
    const template = getTemplate(name, token);

    //-----ENVIAR EL EMAIL------
    await sendEmail(email, "¡Te damos la bienvenida!", template);
    await newUser.save();

    res.json({
      success: true,
      msg: "Registro exitoso",
    });
  } catch (err) {
    next(err);
  }
}

const confirm = async (req, res) => {
  try {
    // Obtener el token
    const { token } = req.params;

    // Verificar la data
    const data = await getTokenData(token);

    if (data === null) {
      return res.json({
        success: false,
        msg: "Error al obtener data",
      });
    }

    console.log(data);

    const { email, code } = data.data;

    // Verificar existencia del usuario
    const user =
      (await Users.findOne({
        where: {
          email: email,
        },
      })) || null;

    if (user === null) {
      return res.json({
        success: false,
        msg: "Usuario no existe",
      });
    }

    // Verificar el código
    if (code !== user.code) {
      return res.redirect("/error.html");
    }

    // Actualizar usuario
    user.email_verified = true;
    await user.save();

    // Redireccionar a la confirmación
    return res.redirect("/confirm.html");
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      msg: "Error al confirmar usuario",
    });
  }
};

async function getUser(req, res, next) {
  var all = await Users.findAll({
    order: [["username", "ASC"]],
  });
  res.json(all);
}

async function deleteUser(req, res, next) {
  let { id } = req.body;
  console.log(id);
  try {
    let existsInDB = await Users.findByPk(id); // primero busca si existe el user en la DB. Si existe lo guarda en esta variable
    if (existsInDB) {
      await Users.destroy({
        // de existir, lo destruye
        where: {
          id,
        },
      });
      return res.json(existsInDB); // devuelve el post eliminado como el metodo pop()
    } else {
      throw new Error(
        "ERROR 500: El usuario no fue encontrado en la base de datos (UUID no existe)."
      );
    }
  } catch (err) {
    next(err);
  }
}

async function getLogIn(req, res, next) {
  const { username, password } = req.body;
  const regexMail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

  if (regexMail.test(username)) {
    const userEmail = await Users.findOne({
      where: {
        email: username,
      },
    });
    if (userEmail) {
      !bcrypt.compareSync(password, userEmail.password)
        ? res.status(403).send("Contraseña incorrecta")
        : res.json(userEmail);
    } else {
      res.status(403).send("Email incorrecto");
    }
  } else {
    const userMatch = await Users.findOne({
      where: {
        username: username,
      },
    });
    if (userMatch) {
      let compare = bcrypt.compareSync(password, userMatch.password);
      if (compare) {
        res.json(userMatch);
      } else {
        res.status(403).send("Password incorrecto");
      }
    } else {
      res.status(403).send("Usuario incorrecto");
    }
  }
}

const editUser = async (req, res, next) => {
  let file = req.file;
  let { country, username, resume, newusername } = req.body;
  try {
    var user = await Users.findOne({ where: { username } });
    if (file) {
      let path = "http://localhost:3001/" + file.filename;
      user.image = path;
    }
    if (country) user.country = country;
    if (resume) user.resume = resume;
    if (newusername) user.username = newusername;
    await user.save();
    res.send(user.toJSON());
  } catch (e) {
    console.log(e);
    res.status(400).json({
      message: "error",
      type: e.message,
    });
  }
};

async function emailResetPassword(req, res, next) {
  const { email } = req.body;
  if (!email) return res.status(500).send({ message: "email nulo" });
  try {
    const userToReset = await Users.findOne({ where: { email } });
    if (!userToReset)
      return res.status(500).send({ message: "usuario no encontrado" });
    const codeUser = getToken({ userToReset });
    const template = getTemplatePassword(codeUser);
    await sendEmailPassword(
      userToReset.email,
      "Recuperación de contraseña",
      template
    );
    res.json({
      success: true,
      message: "Enviado",
    });
  } catch (error) {
    next(error);
  }
}
const editPassword = async (req, res) => {
  const { password, token } = req.body;
  const { data } = getTokenData(token);
  const email = data.userToReset.email;
  try {
    const user = await Users.findOne({ where: { email } });
    if (!user)
      return res
        .status(404)
        .json({ message: "error no se encontro el usuario" });
    const passwordHash = await bcrypt.hash(password, 10);
    user.password = passwordHash;
    await user.save();
    return res.send(user.toJSON());
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error.message,
    });
  }
};

async function getUserById(req, res, next) {
  let { idUser } = req.params;
  if (idUser && idUser.length === 36) {
    // 36 es la length del UUID /// TODA ESTA INFO DEBERIA VERLA SOLO EL ADMIN
    try {
      let result = await Users.findOne({
        attributes: { exclude: ["password"] },
        where: {
          id: idUser,
        },
        include: [
          {
            model: Posts,
            attributes: { exclude: ["user_id", "category_id"] },
            order: [["createdAt", "DESC"]],
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
              {
                model: Question,
                attributes: ["title", "question", "answer"],
                order: [["createdAt", "DESC"]],
                include: [
                  {
                    model: Users,
                    attributes: ["username"],
                  },
                ],
              },
            ],
          },
        ],
      });

      let compras = await Orders.findAll({
        include: [
          {
            model: Posts,
            attributes: ["id", "title", "user_id"],
            where: { user_id: idUser },
          },
        ],
      });
      if (result) res.json({ result, compras });
      else
        throw new Error(
          "ERROR 500: El usuario no fue encontrado en la base de datos (UUID no existe)."
        );
    } catch (err) {
      next(err);
    }
  } else {
    try {
      throw new TypeError(
        "ERROR 404: ID inválido (ID no es un tipo UUID válido)."
      );
    } catch (err) {
      next(err);
    }
  }
}

module.exports = {
  createUser,
  deleteUser,
  getUser,
  getLogIn,
  confirm,
  editUser,
  emailResetPassword,
  editPassword,
  getUserById,
};
