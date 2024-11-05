import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { publicProfile } from "../../actions/action-talents/user";
import Footer from "../Landing/Footer";
import defaultImage from "../../assets/profile_default.png";
import NavbarComp from "../Navbar/NavbarComp";

export default function ProfilePublic() {
  const id = useParams();
  // const user = useSelector((state) => state.index.user);
  // const orders = useSelector((state) => state.index.profile);
  const sellerProfile = useSelector(
    (state) => state?.userSliceReducer.public_profile
  );
  // let navigate = useNavigate();
  // const [order, setOrder] = useState([]);
  const dispatch = useDispatch();
  // console.log(sellerProfile)

  // let body = {
  //   senderId: user.id,
  //   receiverId: id.idVendedor,
  // };

  useEffect(() => {
    dispatch(publicProfile(id.idVendedor));
    // console.log('id user effect',id.idVendedor)
  }, [dispatch, id.idVendedor]);

  // async function onClick(e) {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.post(`${PROXY}/conversation`, body);
  //     console.log(res.data);
  //     navigate("/messenger");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // useEffect(() => {

  //   const validate = async () => {
  //     try {
  //       let orderValidate = await orders.orders?.find(
  //         (o) => o.post.user.id === id.idVendedor
  //       );
  //       setOrder(orderValidate);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   validate();
  // }, [orders, id]);
  // asd
  return (
    <div class="">
      <NavbarComp />
      <div class="flex flex-col min-h-screen p-2 bg-semilight">
        <div class="flex flex-col items-center">
          <img
            class="rounded-full h-64 w-64 object-cover"
            src={sellerProfile?.image ? sellerProfile?.image : defaultImage}
            alt=""
          />
        </div>
        <div class="bg-dark p-2 rounded-md mt-5 mb-5">
          <h3 class="font-semibold text-xl text-white">Datos personales</h3>
          <div class="bg-light rounded-md mb-2 mt-2 p-2">
            <h3 class="">Nombre completo: {sellerProfile?.fullName}</h3>
            <h4 class="">Username: {sellerProfile?.username}</h4>
            <h4>Email: {sellerProfile?.email}</h4>
            <h4>Pais: {sellerProfile?.country}</h4>
          </div>
        </div>
        <div class="bg-dark p-2 rounded-md mt-5 mb-5">
          <h4 class="font-semibold text-xl text-white">Sobre mi:</h4>
          <p class="bg-light rounded-md mb-2 mt-2 p-2">
            {sellerProfile?.resume}
          </p>
        </div>
        <div class="bg-dark p-2 rounded-md mt-5 mb-5">
          <h3 class="font-semibold text-xl text-white">Publicaciones</h3>

          {sellerProfile?.posts?.map((item) => (
            <div class="bg-light rounded-md mb-2 mt-2 p-2">
              <h4 class="font-semibold text-dark">{item?.title}</h4>
              <p>{item?.description}</p>
            </div>
          ))}
        </div>
        {/* <div class="bg-dark p-2 rounded-md mt-5 mb-5"> 
              <h3 class="font-semibold text-xl text-white">Reviews de usuarios</h3>
              {sellerProfile.reviews.map((item) =>  
                <div class="bg-light rounded-md mb-2 mt-2 p-2">
                  <h4 class="font-semibold">
               {     [...Array(5)].fill("").map((_, i) => (
                      <StarIcon
                        key={i}
                        color={
                          i <= item?.qualification - 1 ? "teal.500" : "gray.300"
                        }
                      />
                    ))}
                    </h4>
                  <p>{item.description}</p> 
                </div>
              )} 
            </div> */}

        {/* {order ? (
        <button
          onClick={(e) => onClick(e)}
          className="btn-custom btn-colors mt-10"
        >
          Comenzar conversación
        </button>
      ) : (
        <p>Para comenzar una conversación debes adquirir un curso</p>
      )}
      <br />
      <br />
      <br />
      <Link to="/home">
        <button className="btn-custom btn-colors">Volver</button>
      </Link> */}
        <Link to="/home">
          <button class="bg-dark w-28 rounded-full m-2 text-white">
            Volver
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}
