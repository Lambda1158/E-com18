
import {Route, Routes } from "react-router-dom";
// import { Private } from './Private';
import Home from "../components/Home/Home";
import Landing from "../components/Landing/Landing";
import Validate from "../components/Register/Validate";
import Register from "../components/Register/Register";
import TalentForm from "../components/Talents/TalentForm";
import SeeMore from "../components/SeeMore/SeeMore";
import Profile from "../components/Profile/Profile";
import ResetPassword from "../components/ResetPassword/ResetPassword";
import EmailResetPassword from "../components/ResetPassword/EmailResetPassword";
import Faq from "../components/Faq/Faq";
import AdminProfile from "../components/AdminProfile/AdminProfile";
import ShoppingCart from "../components/ShoppingCart/ShoppingCart";
import CheckoutMP from "../components/Checkout/CheckoutMP";
import ProfilePublic from "../components/ProfilePublic/ProfilePublic";
import Messenger from "../components/Chat/Messenger";
import AboutUs from "../components/AboutUs/AboutUs";


export const Aux = () => {

  // No se para que es esto
  //   if (checking) {
  //     return <h3>Cargando...</h3>;
  //   }

  return (

      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/ResetPassword" element={<ResetPassword />} />
        {/* <Route exact path="/NewPassword" element={<NewPassword />} /> */}
        <Route path="/createTalent" element={<TalentForm />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/profilePublic/:idVendedor" element={<ProfilePublic />} />
        <Route path="/user/confirm/:token" element={<Validate />} />
        <Route exact path="/register" element={<Register />} />
        <Route
          path="/user/emailresetpassword"
          element={<EmailResetPassword />}
        />
        <Route path="/user/resetpassword" element={<ResetPassword />} />
        <Route
          path="/home"
          element={
            <Home
            // <Route
            // element = {(props) =>
            // isLoggedIn ? <Home /> : <Navigate to='/' />
            // }
            />
          }
        />
        <Route path="/talent/:id" element={<SeeMore />} />
        <Route path="/checkoutApro" element={<CheckoutMP />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/about" element={<AboutUs />} />
        {/* <ProtectedRoute isLoggedIn={isLoggedIn} path='/home' element={<Home />} /> */}
        <Route path="/admin" element={<AdminProfile />} />
      </Routes>

  );
};
