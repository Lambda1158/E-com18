import React, { useEffect, useState } from "react";
import { PROXY } from "../../actions";
import ReactModal from "react-modal";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../actions";
import { useNavigate } from "react-router-dom";
import Navbar from "../Landing/Navbar";
import Footer from "../Landing/Footer";

function TalentForm() {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const categories = useSelector((state) => state.mislice.categories);
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const [previewSource, setPreviewSource] = useState(null);
  const [file, setFile] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    duration: "",
    cost: "",
    category: "",
    timeZone: "",
    language: "",
  });
  //! VER EL PATH
  const [ventanaModal, setVentanaModal] = useState(false);

  function handleOnChange(e) {
    if (e.target.name === "image") {
      setFile(e.target.files[0]);
      previewFile(e.target.files[0]);
    } else {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    }
  }

  const handleOnSelect = (e) => {
    e.preventDefault();
    setForm({
      ...form,
      category: e.target.value,
    });
  };

  let filteredCategories = categories.filter(
    (el) => el.title !== form.category
  );
  const onSubmit = (e) => {
    e.preventDefault();
    setVentanaModal(true);
  };
  const changeModal = (e) => {
    e.preventDefault();
    setVentanaModal(!ventanaModal);
  };
  function previewFile(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  }

  function onSubmitForm(e) {
    e.preventDefault();
    let fb = new FormData();
    fb.append("username", user.username);
    fb.append("title", form.title);
    fb.append("description", form.description);
    fb.append("duration", form.duration);
    fb.append("cost", form.cost);
    fb.append("image", file);
    fb.append("category", form.category);
    fb.append("timeZone", form.timeZone);
    fb.append("language", form.language);
    axios({
      method: "post",
      url: `${PROXY}/post`,
      data: fb,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setPreviewSource(null);
    alert("Curso creado satisfactoriamente");
    navigate("/home");
  }
  function previewFile(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  }

  return (
    <div className="box-border w-full h-screen">
      <Navbar />
      <h1 className="flex justify-center bg-semilight text-dark text-4xl font-semibold py-8">
        ¡Crea un nuevo curso en base a tu talento!
      </h1>
      <div className="flex flex-row justify-center bg-semilight py-auto">
        <div className="flex justify-center bg-semilight text-white">
          <form
            onSubmit={(e) => onSubmit(e)}
            className="grid grid-cols-2 gap-x-16 w-auto h-auto bg-semidark p-4 border-white border-2 rounded mb-32"
          >
            <div className="flex flex-col space-y-2">
              <h1 className="font-semibold text-2xl">Datos generales</h1>
              <label className="text-lg">Nombre del curso: </label>
              <input
                className="w-full text-lg justify-self-center self-center border-2 rounded-md text-white placeholder-white border-white border-opacity-70 text-center bg-dark"
                onChange={handleOnChange}
                type="text"
                name="title"
                placeholder="Nombre curso"
                required
              />
              <label className="text-lg">Descripcion: </label>
              <textarea
                onChange={handleOnChange}
                className="resize-none overflow-y-auto justify-self-center border-2 rounded-md border-white bg-dark text-white placeholder-white border-opacity-70 text-center p-8"
                name="description"
                rows="11"
                cols="25"
                placeholder="Ingrese la descripcion del curso"
                required
              />
              {previewSource && (
                // eslint-disable-next-line jsx-a11y/alt-text
                <img
                  src={previewSource}
                  className="flex justify-center rounded"
                />
              )}
            </div>
            <div>
              <div className="flex flex-col space-y-2">
                <h1 className="text-lg">Imagenes de tu talento:</h1>
                <label
                  className="
                                w-full
                                flex flex-col
                                items-center
                                px-4
                                py-2
                                bg-dark
                                rounded-md
                                shadow-md
                                tracking-wide
                                uppercase 
                                border-2
                                cursor-pointer
                                hover:bg-semidark hover:text-white
                                text-light
                                ease-linear
                                transition-all
                                duration-150
                                "
                >
                  <span>🗂</span>
                  <span className="mt-2 text-base leading-normal">
                    Selecciona una imagen
                  </span>
                  <input
                    className="hidden"
                    onChange={handleOnChange}
                    type="file"
                    name="image"
                    required
                  />
                </label>
                <h1 className="text-lg">Categoría: </h1>
                <select
                  className="h-10 w-full pl-2 justify-center bg-dark rounded text-white border-2"
                  onChange={(e) => handleOnSelect(e)}
                >
                  <option>Selecciona una categoria</option>
                  {!categories ? (
                    <option>Cargando</option>
                  ) : (
                    categories.map((el) => {
                      return (
                        <option key={el.id} name="category">
                          {el.title}
                        </option>
                      );
                    })
                  )}
                </select>
                <label className="text-lg">Duracion: </label>
                <input
                  className="h-8 w-full justify-self-center self-center border-2 rounded-md border-white bg-dark text-white placeholder-white border-opacity-70 px-3"
                  onChange={handleOnChange}
                  type="number"
                  name="duration"
                  placeholder="Horas"
                  required
                />
                {/* <select className="h-10 w-full pl-2 justify-self-center self-center border-2 rounded-md border-white bg-dark text-white placeholder-white border-opacity-70 px-3"
                            onChange={handleOnChange}
                            name='timeZone'
                            required/> */}
                <label className="text-lg">Zona horaria: </label>
                <select
                  onChange={handleOnChange}
                  className="h-8 w-full justify-self-center self-center border-2 rounded-md border-white bg-dark text-white placeholder-white border-opacity-70 px-3"
                  required
                  name="timeZone"
                >
                  <option name="timeZone">Selecciona una zona horaria:</option>
                  <option value="GMT+1">GMT+1</option>
                  <option value="GMT-0">GMT 0</option>
                  <option value="GMT-1">GMT-1</option>
                  <option value="GMT-2">GMT-2</option>
                  <option value="GMT-3">GMT-3</option>
                  <option value="GMT-4">GMT-4</option>
                  <option value="GMT-5">GMT-5</option>
                  <option value="GMT-6">GMT-6</option>
                </select>
                <label className="text-lg">Idioma:</label>
                <select
                  className="h-10 w-full pl-2 justify-self-center self-center border-2 rounded-md border-white bg-dark text-white placeholder-white border-opacity-70 px-3"
                  onChange={handleOnChange}
                  name="language"
                  required
                >
                  <option name="language">Selecciona el idioma:</option>
                  <option value="Alemán">Alemán 🇩🇪</option>
                  <option value="Español">Español 🇪🇸</option>
                  <option value="Francés">Francés 🇫🇷</option>
                  <option value="Inglés">Inglés 🇺🇸/🇬🇧</option>
                  <option value="Italiano">Italiano 🇮🇹</option>
                  <option value="Japonés">Japonés 🇯🇵</option>
                  <option value="Portugués">Portugués 🇧🇷/🇵🇹</option>
                </select>
                <h1>Precio:</h1>
                <input
                  className=" h-8 border-2 rounded-md border-white border-opacity-70 bg-dark placeholder-white text-white px-3"
                  onChange={handleOnChange}
                  type="number"
                  name="cost"
                  placeholder="Pesos"
                  required
                />{" "}
              </div>
              <div className="flex flex-row items-center justify-center space-x-4 my-8">
                <button className="btn-primary btn-colors"> Revisar </button>
                <Link to="/home">
                  <button className="btn-primary btn-colors"> Volver </button>
                </Link>
              </div>
              {!ventanaModal && (
                <ReactModal
                  isOpen={ventanaModal}
                  onRequestClose={changeModal}
                  contentLabel="Example Modal"
                  className=" absolute m-auto w-1/2 inset-x-0 bg-semilight border-2 border-white rounded-lg"
                  overlayClassName="fixed inset-0 bg-black bg-opacity-90"
                >
                  <div className="flex justify-center items-center text-dark bg-semilight text-4xl font-semibold mt-6 py-6">
                    <h1>Por favor, revisa la información antes de enviarla</h1>
                  </div>
                  <div className="flex flex-col bg-semilight">
                    <div className="flex justify-center h-2/3 bg-semilight">
                      <form
                        onSubmit={(e) => onSubmitForm(e)}
                        className="flex flex-col pl-2 bg-dark text-white py-4 space-y-4 w-3/6 rounded border-2 border-white"
                      >
                        <div>
                          <label className="mr-4 text-2xl">Titulo: </label>
                          <input
                            className="bg-dark text-white text-2xl"
                            onChange={handleOnChange}
                            type="text"
                            name="title"
                            value={form.title}
                            placeholder="Nombre curso"
                          />
                        </div>
                        <div className="flex items-start">
                          <label className="mr-4">Descripcion: </label>
                          <textarea
                            onChange={handleOnChange}
                            className="bg-dark"
                            name="description"
                            rows="3"
                            cols="50"
                            value={form.description}
                            placeholder="Ingrese la descripcion del curso"
                          />
                        </div>
                        {previewSource && (
                          // eslint-disable-next-line jsx-a11y/alt-text
                          <img
                            src={previewSource}
                            style={{ height: "150px" }}
                          />
                        )}
                        <div>
                          <label className="mr-4 text-xl">Categoria: </label>
                          <select
                            className="bg-dark text-lg"
                            onChange={(e) => handleOnSelect(e)}
                          >
                            {form.category ? (
                              <option>{form.category}</option>
                            ) : (
                              <option>Selecciona una categoria</option>
                            )}
                            {!filteredCategories ? (
                              <option>Cargando</option>
                            ) : (
                              filteredCategories.map((el) => {
                                return (
                                  <option key={el.id} name="category">
                                    {el.title}
                                  </option>
                                );
                              })
                            )}
                          </select>
                        </div>
                        <div>
                          <label className="mr-4 text-xl">Duracion: </label>
                          <input
                            className="bg-dark"
                            onChange={handleOnChange}
                            type="number"
                            name="duration"
                            value={form.duration}
                            placeholder="Duracion | Horas"
                          />
                        </div>
                        {/* <div>
                                            <label className='mr-4 text-2xl'>Precio: </label>
                                            <input 
                                                className='bg-dark'
                                                onChange={handleOnChange} 
                                                type="number" 
                                                name="cost"  
                                                value={form.cost}
                                                placeholder="Precio | Dolares"
                                                />
                                            </div>
                                        <div>
                                            <label className='mr-4 text-l'>Zona Horaria: </label>
                                            <input 
                                                className='bg-dark'
                                                onChange={handleOnChange} 
                                                type="text" 
                                                name="timeZone"  
                                                value={form.timeZone}
                                                />
                                        </div>
                                        <div>
                                            <label className='mr-4 text-2xl'>Idioma: </label>
                                            <input 
                                                className='bg-dark'
                                                onChange={handleOnChange} 
                                                type="text" 
                                                name="language"  
                                                value={form.language}
                                                />
                                        </div> */}
                        <div className="bg-dark flex flex-row justify-center items-center">
                          <button
                            type="submit"
                            className="btn-primary btn-colors mx-2"
                          >
                            Crear curso
                          </button>
                          <Link to="/home">
                            <button className="btn-primary btn-colors">
                              Cancelar
                            </button>
                          </Link>
                        </div>
                      </form>
                    </div>
                  </div>
                </ReactModal>
              )}
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default TalentForm;
