import { Route, Routes } from "react-router-dom";
import AuthanticatedLayout from "./layouts/Authanticated";
import BasicLayout from "./layouts/Basic";
import Home from "./pages/homepage";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Register from "./pages/register";
import Funding from "./pages/funding";
import AdminPage from "./pages/adminpage";
import ShowAnalytics from "./pages/fundingAnalytics";
import AddBank from "./pages/addbank";
import FundingAnalytics from "./pages/fundingAnalytics";
import BankPage from "./pages/bankpage";
function App() {
  return (
    <Routes>
      <Route element={<AuthanticatedLayout />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/funding" element={<Funding />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/showAnalytics" element={<ShowAnalytics />} />
        <Route path="/bank" element={<AddBank />} />
        <Route path="analytics" element={<FundingAnalytics />} />
        <Route path="/bankpage" element={<BankPage />} />
      </Route>
      <Route element={<BasicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;
