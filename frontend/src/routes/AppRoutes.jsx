import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterPartner from "../pages/auth/RegisterPartner";
import LoginPartner from "../pages/auth/LoginPartner";
import RegisterUser from "../pages/auth/RegisterUser";
import LoginUser from "../pages/auth/LoginUser";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/user/register" element={<RegisterUser />} />
        <Route path="/user/login" element={<LoginUser />} />
        <Route path="/" element={<h1>home</h1>} />
        <Route path="/partner/register" element={<RegisterPartner />} />
        <Route path="/partner/login" element={<LoginPartner />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
