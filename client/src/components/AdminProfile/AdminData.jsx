import axios from "axios";
import { useEffect, useState } from "react";
import BotonOptions from "./BotonOptions";
import { PROXY } from '../../actions/index'
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';


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
          <Table>
            <Thead>
              <Tr>
                <Th>FullName</Th>
                <Th>Username</Th>
                <Th>Email</Th>
                <Th>Verificado</Th>
                <Th>Estado</Th>
                <Th>Opciones</Th>
              </Tr>
            </Thead>
              {data[`${pestaña}`].map((el) => {
                if(el.username === "admin") return;
                return (
                  <Tbody>
                    <Tr key={el.id} className="bg-semilight border w-max">
                      <Td>{el.fullName}</Td>
                      <Td>{el.username}</Td>
                      <Td>{el.email}</Td>
                      {el.email_verified ? <Td>Si</Td> : <Td>No</Td>}
                      {el.aprobado ? <Td>Aprobado</Td> : <Td>Pendiente</Td>}
                      <Td>
                        <BotonOptions
                          mail={el.email}
                          estado={el.aprobado}
                          value={el.id}
                          botonClick={botonClick}
                          funcionBorrar={funcionBorrar}
                        />
                      </Td>
                    </Tr>
                  </Tbody>
                );
              })}
          </Table>
        ) : //Caso de que sea la pestaña Post
        pestaña === "post" ? (
          <Table>
            <Thead>
              <Tr>
                <Th>Titulo</Th>
                <Th>Docente</Th>
                <Th>Costo</Th>
                <Th>Puntaje</Th>
                <Th>Estado</Th>
                <Th>Opciones</Th>
              </Tr>
            </Thead>
            {data[`${pestaña}`].map((el) => {
              return (
                <Tbody>
                  <Tr key={el.id} className="bg-semilight border w-max">
                    <Td>{el.title}</Td>
                    <Td>{el[`user.username`]}</Td>
                    <Td>{el.cost}</Td>
                    <Td>{el.rating}</Td>
                    {el.aprobado ? <Td>Aprobado</Td> : <Td>Pendiente</Td>}
                    <Td>
                      <BotonOptions
                        mail={el[`user.email`]}
                        value={el.id}
                        estado={el.aprobado}
                        botonClick={botonClick}
                        funcionBorrar={funcionBorrar}
                      />
                    </Td>
                  </Tr>
                </Tbody>
              );
            })}
          </Table>
        ) : (
          //Caso de que sea la pestaña Review
          <Table>
            <Thead>
              <Tr>
                <Th>Usuario</Th>
                <Th>Calificacion</Th>
                <Th>Reseña</Th>
                <Th>Estado</Th>
                <Th>Opciones</Th>
              </Tr>
            </Thead>
            {data[`${pestaña}`].map((el) => {
              return (
                <Tbody>
                  <Tr key={el.id} className="bg-semilight border w-max">
                    <Td>{el[`user.username`]}</Td>
                    <Td>{el.qualification}</Td>
                    <Td>{el.description}</Td>
                    {el.aprobado ? <Td>Aprobado</Td> : <Td>Pendiente</Td>}
                    <Td>
                      <BotonOptions
                        mail={el[`user.email`]}
                        value={el.id}
                        estado={el.aprobado}
                        botonClick={botonClick}
                        funcionBorrar={funcionBorrar}
                      />
                    </Td>
                  </Tr>
                </Tbody>
              );
            })}
          </Table>
        )
      }
    </div>
  );
}

export default AdminData;
