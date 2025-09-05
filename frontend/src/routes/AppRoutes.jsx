import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterPartner from "../pages/auth/RegisterPartner";
import LoginPartner from "../pages/auth/LoginPartner";
import RegisterUser from "../pages/auth/RegisterUser";
import LoginUser from "../pages/auth/LoginUser";
import ReelsPage from "../pages/general/ReelsPage";
import ProfilePage from "../pages/general/ProfilePage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/user/register" element={<RegisterUser />} />
        <Route path="/user/login" element={<LoginUser />} />
        <Route path="/" element={<ReelsPage />} />
        <Route path="/partner/register" element={<RegisterPartner />} />
        <Route path="/partner/login" element={<LoginPartner />} />
        <Route path="/partner/profile/:id" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
