import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginProvider } from "./context/loginContext.js";
import { CartProvider } from "./context/cartContext.js";
import { OrderProvider } from "./context/orderContext.js";
import './index.css'
import NavBar from "./components/NavBar/NavBar.jsx";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer.jsx";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer.jsx";
import RegisterForm from "./components/RegisterForm/RegisterForm.jsx";
import LoginForm from "./components/LoginForm/LoginForm.jsx";
import Cart from "./components/Cart/Cart.jsx";
import CardUser from "./components/CardUser/CardUser.jsx";
import Checkout from "./components/Checkout/Checkout.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <OrderProvider>
          <CartProvider>
            <LoginProvider>
              <NavBar />
              <Routes>
                <Route path="/" element={<ItemListContainer />} />
                <Route path="/category/:category" element={<ItemListContainer />} />
                <Route path="/item/:id" element={<ItemDetailContainer />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/cardUser" element={<CardUser />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="*" element={<h2>Sitio en construcción</h2>} />
              </Routes>
            </LoginProvider>
          </CartProvider>
        </OrderProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
