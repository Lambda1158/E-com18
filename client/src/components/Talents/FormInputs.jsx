import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createTalent } from "../../actions/action-talents/talents";
const language = [
  { value: "Alemán", text: "Alemán 🇩🇪" },
  { value: "Español", text: "Español 🇪🇸" },
  { value: "Francés", text: "Francés 🇫🇷" },
  { value: "Inglés", text: "Inglés 🇺🇸/🇬🇧" },
  { value: "Italiano", text: "Italiano 🇮🇹<" },
  { value: "Japonés", text: "Japonés 🇯🇵" },
  { value: "Portugués", text: "Portugués 🇧🇷/🇵🇹" },
];
const hora = [
  "GMT+1",
  "GMT-0",
  "GMT-1",
  "GMT-2",
  "GMT-3",
  "GMT-4",
  "GMT-5",
  "GMT-6",
];
export default function FormInputs({ categories, modal }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
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

  function previewFile(file) {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewSource(reader.result);
      };
    }
    return;
  }

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

  function clearFoto() {
    setFile(null);
    setPreviewSource(null);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formhtml = document.getElementById("formtest");
    const fb = new FormData(formhtml);
    fb.append("username", user.username);
    dispatch(createTalent(fb));
    modal();
  };
  return (
    <div className="mx-auto w-4/5 m-6 border-2 p-2 shadow-2xl">
      <form
        method="POST"
        onSubmit={handleSubmit}
        id="formtest"
        className="grid grid-col-2 grid-cols-[70%_30%] rounded-lg gap-3"
      >
        <div className=" p-4 shadow-2xl">
          <h1 className=" text-4xl font-normal p-2">Crea tu nuevo post 🤠</h1>
          <div className="border-2 ml-10 p-2">
            <h1 className="font-normal text-3xl p-2">Datos generales</h1>
            <section className="flex flex-col items-center">
              <div className=" w-[600px] flex justify-around mt-2">
                <label className="text-lg mr-2 w-[200px]">
                  Nombre del curso:
                </label>
                <input
                  className=" w-[250px] text-lg text-white placeholder-white text-center bg-dark focus:outline-none focus:placeholder-opacity-0	"
                  onChange={handleOnChange}
                  type="text"
                  name="title"
                  placeholder="Nombre curso"
                  required
                />
              </div>
              <div className=" w-[600px] flex justify-around mt-4">
                <label className="text-lg mr-2 w-[200px]">Categoría: </label>
                <select
                  className=" w-[250px] text-lg text-white placeholder-white text-center bg-dark focus:outline-none focus:placeholder-opacity-0"
                  onChange={(e) => handleOnSelect(e)}
                  name="category"
                >
                  <option>Selecciona una categoria</option>
                  {!categories ? (
                    <option>Cargando</option>
                  ) : (
                    categories.map((el) => {
                      if (el.title === "All") return;
                      return (
                        <option key={el.id} value={el.title}>
                          {el.title}
                        </option>
                      );
                    })
                  )}
                </select>
              </div>
              <div className=" w-[600px] flex justify-around mt-4">
                <label className="w-[200px] text-lg mr-2">Duracion: </label>
                <input
                  className="w-[250px] text-lg text-white placeholder-white text-center bg-dark focus:outline-none focus:placeholder-opacity-0"
                  onChange={handleOnChange}
                  type="number"
                  name="duration"
                  placeholder="Horas"
                  required
                />
              </div>
              <div className=" w-[600px] flex justify-around mt-4">
                <label className="text-lg mr-2 w-[200px]">Zona horaria:</label>
                <select
                  onChange={handleOnChange}
                  className="w-[250px] text-lg text-white placeholder-white text-center bg-dark focus:outline-none focus:placeholder-opacity-0"
                  required
                  name="timeZone"
                >
                  <option name="timeZone">Seleccionar zona horaria:</option>
                  {hora.map((element) => {
                    return (
                      <option key={element} value={element}>
                        {element}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className=" w-[600px] flex justify-around mt-4">
                <label className="text-lg mr-2 w-[200px]">Idioma:</label>
                <select
                  className="w-[250px] text-lg text-white placeholder-white text-center bg-dark focus:outline-none focus:placeholder-opacity-0"
                  onChange={handleOnChange}
                  name="language"
                  required
                >
                  <option name="language">Seleccionar idioma:</option>
                  {language.map((element) => {
                    return (
                      <option key={element.value} value={element.value}>
                        {element.text}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className=" w-[600px] flex justify-around mt-4">
                <label className="w-[200px] text-lg mr-2">Precio:</label>
                <input
                  className="w-[250px] text-lg text-white placeholder-white text-center bg-dark focus:outline-none focus:placeholder-opacity-0"
                  onChange={handleOnChange}
                  type="number"
                  step="0.01"
                  name="cost"
                  placeholder="Pesos"
                  required
                />
              </div>
            </section>
          </div>
        </div>
        <div className="flex flex-col justify-between p-2">
          <section>
            <label className="hover:scale-105 duration-300 mt-2 flex flex-col items-center bg-dark rounded-md cursor-pointer hover:bg-semidark p-2 w-10/12 mx-auto">
              <span>🗂</span>
              <span className=" text-base text-white">Cargar una Imagen</span>
              <input
                className="hidden"
                onChange={handleOnChange}
                type="file"
                name="image"
                required
                onClick={() => setFile()}
              />
            </label>
            {previewSource && (
              <img
                src={previewSource}
                className="p-2 mt-2 mx-auto w-11/12 h-fit rounded cursor-pointer hover:scale-105 duration-300"
                onClick={clearFoto}
              />
            )}
          </section>
          <section className="flex justify-center flex-col ">
            <p className="text-xl  text-center mb-2">Descripcion </p>
            <textarea
              onChange={handleOnChange}
              className="w-10/12 overflow-y-auto border-2 rounded-md border-white bg-dark text-white placeholder-white border-opacity-70 text-center p-4 mx-auto"
              name="description"
              rows="3"
              cols="25"
              placeholder="Ingrese la descripcion de tu publicacion"
              required
            />
          </section>
        </div>
        <div className="flex flex-row items-center justify-center space-x-6 m-4 ">
          <button
            type="submit"
            value="submit"
            className="w-[130px] hover:bg-semidark bg-dark text-[#A7C4BC] font-semibold hover:text-white py-2 px-4 border border-dark hover:border-semilight rounded p-2 hover:scale-105 transform duration-300"
          >
            Revisar
          </button>
          <Link to="/home">
            <button className="w-[130px] hover:bg-semidark bg-slate-800 text-[#A7C4BC] font-semibold hover:text-white py-2 px-4 border border-dark hover:border-semilight rounded p-2 hover:scale-105 transform duration-300">
              Volver
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
