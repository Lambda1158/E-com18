import { Route, Routes } from "react-router-dom";
import Home from "../components/Home/Home";
import Landing from "../components/Landing/Landing";
import Validate from "../components/Navbar/Validate";
import TalentForm from "../components/Talents/TalentForm";
import SeeMore from "../components/SeeMore/SeeMore";
import Profile from "../components/Profile/Profile";
import ResetPassword from "../components/ResetPassword/ResetPassword";
import EmailResetPassword from "../components/ResetPassword/EmailResetPassword";
import Faq from "../components/Faq/Faq";
import AdminProfile from "../components/AdminProfile/AdminProfile";
import ShoppingPage from "../components/ShoppingCart/ShoppingPage";
import CheckoutMP from "../components/Checkout/CheckoutMP";
import ProfilePublic from "../components/ProfilePublic/ProfilePublic";
import Messenger from "../components/Chat/Messenger";
import AboutUs from "../components/AboutUs/AboutUs";
export const Aux = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Landing />} />
      <Route path="/createTalent" element={<TalentForm />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/profilePublic/:idVendedor" element={<ProfilePublic />} />
      <Route path="/user/confirm/:token" element={<Validate />} />
      <Route path="/user/emailresetpassword" element={<EmailResetPassword />} />
      <Route path="/user/resetpassword/:token" element={<ResetPassword />} />
      <Route path="/home" element={<Home />} />
      <Route path="/talent/:id" element={<SeeMore />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/cart" element={<ShoppingPage />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/admin" element={<AdminProfile />} />
    </Routes>
  );
};
