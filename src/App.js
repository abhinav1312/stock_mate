import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./components/landingPage/LandingPage";
import ProductUpdate from "./components/productUpdate/ProductUpdate";
import Inventory from "./components/inventory/Inventory";
import Dashboard from "./components/dashboard/Dashboard";
import AddProductState from "./context/addProduct/AddProductState";
import { useContext } from "react";
import AlertContext from "./context/alert/AlertContext";
import AlertBox from "./components/alert/AlertBox";
import AuthState from "./context/auth/AuthState";

function App() {
  const alertContext = useContext(AlertContext);
  const alertMsgTitle = alertContext.alertMsg.title;
  const alertMsgContent = alertContext.alertMsg.message;
  console.log("Hello: ", process.env.REACT_APP_API_KEY)
  return (
    <>
    <AlertBox title={alertMsgTitle} message={alertMsgContent} />
    <AuthState>
      <BrowserRouter>
        <Routes>
          <Route path="/" element = {<LandingPage />} />
          <Route path="/hero" element = {<Dashboard />} />
          <Route path="/hero/product_update" element = {<AddProductState><ProductUpdate /></AddProductState>} />
          <Route path="/hero/inventory" element = {<Inventory />} />
          <Route path="*" element = {<h1> Error 404 </h1>} />
        </Routes>
      </BrowserRouter>
      </AuthState>
    </>
  );
}

export default App;
