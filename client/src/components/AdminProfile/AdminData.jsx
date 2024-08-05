import axios from "axios";
import { useEffect, useState } from "react";
import BotonOptions from "./BotonOptions";
import { PROXY } from '../../actions/index'


function AdminData({ pestaña, data, setData }) {
  let [put, setPut] = useState(false);

  console.log("DATA: ", data);
  useEffect(() => {
    axios.get(`${PROXY}/admin`).then((res) =>
      setData({
        user: res.data.users,
        post: res.data.posts,
        review: res.data.review,
      })
    );
  }, [put]);

  function botonClick(e) {
    e.preventDefault();
    let aux = {
      id: e.target.value,
      name: pestaña,
      email: e.target.name
    };
    axios
    .put(`${PROXY}/admin`, aux)
    .then((res) => res)
    .catch((err) => console.log("ESTE ES EL ERROR DEL PUT: ", err));
    setPut(!put);
  }

  function funcionBorrar(e) {
    e.preventDefault();
    let aux = {
      id: e.target.value,
      name: pestaña,
      email: e.target.name
    };
    axios
    .delete(`${PROXY}/admin`, { data: aux })
    .then((res) => console.log(res))
    .catch((err) => console.log("ESTE ES EL ERROR DEL DELETE: ", err));
    setPut(!put);
  }

  return (
    <div className="w-full">
      {
        //Caso de que sea la pestaña usuarios
        pestaña === "user" ? (
          <table>
            <thead>
              <tr>
                <th>FullName</th>
                <th>Username</th>
                <th>Email</th>
                <th>Verificado</th>
                <th>Estado</th>
                <th>Opciones</th>
              </tr>
            </thead>
              {data[`${pestaña}`].map((el) => {
                if(el.username === "admin") return;
                return (
                  <tbody>
                    <tr key={el.id} className="bg-semilight border w-max">
                      <td>{el.fullName}</td>
                      <td>{el.username}</td>
                      <td>{el.email}</td>
                      {el.email_verified ? <Td>Si</Td> : <Td>No</Td>}
                      {el.aprobado ? <Td>Aprobado</Td> : <Td>Pendiente</Td>}
                      <td>
                        <BotonOptions
                          mail={el.email}
                          estado={el.aprobado}
                          value={el.id}
                          botonClick={botonClick}
                          funcionBorrar={funcionBorrar}
                        />
                      </td>
                    </tr>
                  </tbody>
                );
              })}
          </table>
        ) : //Caso de que sea la pestaña Post
        pestaña === "post" ? (
          <table>
            <thead>
              <tr>
                <th>Titulo</th>
                <th>Docente</th>
                <th>Costo</th>
                <th>Puntaje</th>
                <th>Estado</th>
                <th>Opciones</th>
              </tr>
            </thead>
            {data[`${pestaña}`].map((el) => {
              return (
                <tbody>
                  <tr key={el.id} className="bg-semilight border w-max">
                    <td>{el.title}</td>
                    <td>{el[`user.username`]}</td>
                    <td>{el.cost}</td>
                    <td>{el.rating}</td>
                    {el.aprobado ? <Td>Aprobado</Td> : <Td>Pendiente</Td>}
                    <td>
                      <BotonOptions
                        mail={el[`user.email`]}
                        value={el.id}
                        estado={el.aprobado}
                        botonClick={botonClick}
                        funcionBorrar={funcionBorrar}
                      />
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        ) : (
          //Caso de que sea la pestaña Review
          <table>
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Calificacion</th>
                <th>Reseña</th>
                <th>Estado</th>
                <th>Opciones</th>
              </tr>
            </thead>
            {data[`${pestaña}`].map((el) => {
              return (
                <tbody>
                  <tr key={el.id} className="bg-semilight border w-max">
                    <td>{el[`user.username`]}</td>
                    <td>{el.qualification}</td>
                    <td>{el.description}</td>
                    {el.aprobado ? <Td>Aprobado</Td> : <Td>Pendiente</Td>}
                    <td>
                      <BotonOptions
                        mail={el[`user.email`]}
                        value={el.id}
                        estado={el.aprobado}
                        botonClick={botonClick}
                        funcionBorrar={funcionBorrar}
                      />
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        )
      }
    </div>
  );
}

export default AdminData;
