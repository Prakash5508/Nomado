import { Route, Routes } from "react-router-dom";
import Header from "./component/Layout/Header";
import { AuthProvider } from "./context/AuthContext";
import Home from "./page/Home/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Profile from "./pages/Profile";
import About from "./component/About";
import Footer from "./component/Layout/Footer";
import Menu from "./component/Menu";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Shop from "./component/Shop";
import { CartProvider } from "./context/CartContext";


function App() {
  
  return (
    <AuthProvider>
      <CartProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
         <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/About" element={<About />} />
        <Route path="/Menu" element={<Menu />} />
        <Route path="/Shop" element={<Shop />} /> 
      </Routes>
      <Footer />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
