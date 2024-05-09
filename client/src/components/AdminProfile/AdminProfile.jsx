import axios from "axios";
import { useEffect, useState } from "react";
import NavAdmin from "./NavAdmin";
import AdminData from "./AdminData";
// import NavBar from '../Talents/BarraNav/NavBar';
import Nav from "./Nav";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PROXY } from "../../actions";

function AdminProfile() {
  const [data, setData] = useState({
    user: [],
    posts: [],
    review: [],
  });

  const { user } = useSelector((state) => state.user);
  const [pestaña, setPestaña] = useState("user");

  useEffect(() => {
    axios.get(`${PROXY}/admin`).then((res) =>
      setData({
        user: res.data.users,
        post: res.data.posts,
        review: res.data.review,
      })
    );
  }, [pestaña]);
  console.log(user);
  return (
    <div>
      {!user.isAdmin ? (
        <div>
          <h1>Permisos denegados</h1>
          <Link to="/home">Regresar</Link>
        </div>
      ) : (
        <div className="bg-light h-screen">
          <Nav />
          <div className="flex flex-col">
            <NavAdmin setPestaña={setPestaña} />
            <AdminData pestaña={pestaña} data={data} setData={setData} />
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminProfile;
