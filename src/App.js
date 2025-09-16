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
import { useState } from "react";

function App() {
  const [cart, setCart] = useState([]);
  return (
    <AuthProvider>
      <Header cart={cart}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu cart={cart} setCart={setCart} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/About" element={<About />} />
        <Route path="/Menu" element={<Menu />} />
      </Routes>
      <Footer />
    </AuthProvider>
  );
}

export default App;
