import { BrowserRouter, Route, Routes } from "react-router-dom";
import IndexPage from "./components/indexPage/IndexPage";
import Inventory from "./components/inventory/Inventory";
import Dashboard from "./components/dashboard/Dashboard";
import AuthState from "./context/auth/AuthState";
import Template from "./components/template/Template";
import Header from "./components/template/Header";
import Template2 from "./components/template/Template2";
import AddProduct from "./components/productUpdate/AddProduct";
import SellProduct from "./components/productUpdate/SellProduct";
import ViewDetail from "./components/productUpdate/ViewDetail";

function App() {
  return (
    <>
    <AuthState>
      <BrowserRouter>
        <Routes>
          <Route path="/" element = {<Header />}>
            <Route index element = {<IndexPage />} />
          </Route>

          <Route path="/hero" element = {<Template />} >
            <Route index element={<Dashboard />} />
            <Route path="product_update" element = {<Template2 />}> 
              <Route path='add_product' element={<AddProduct />} />
              <Route path='sell_product' element={<SellProduct />} />
              <Route path='view_detail' element={<ViewDetail />} />
            </Route>
          </Route>
          <Route path="/hero/inventory" element = {<Inventory />} />
          <Route path="*" element = {<h1> Error 404 </h1>} />
        </Routes>
      </BrowserRouter>
      </AuthState>
    </>
  );
}

export default App;
