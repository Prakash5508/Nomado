import { useContext, useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo/logo.png";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
import MiniCart from "../cart/MiniCart";
import "../../styles/HeaderStyle.css";

function Header({ cart = [] }) {
  const [nav, setNav] = useState(false);
  const [expanded, setExpanded] = useState(false); // 👈 toggle control
  const { user, logout } = useContext(AuthContext);
  const { count } = useContext(CartContext);
  const [showMini, setShowMini] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const changeValueScroll = () => setNav(document.documentElement.scrollTop >= 80);
    window.addEventListener("scroll", changeValueScroll);
    return () => window.removeEventListener("scroll", changeValueScroll);
  }, []);

  // 👇 nav close function
  const handleCloseNav = () => setExpanded(false);

   const handleNavClick = (path) => {
    navigate(path);
    setExpanded(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header>
      <Navbar
        collapseOnSelect
        expand="lg"
        className={nav ? "sticky" : ""}
        expanded={expanded} // 👈 control expansion
      >
        <Container>
          {/* Logo */}
          <Navbar.Brand as="div">
            <Link to="/" className="logo" onClick={handleCloseNav}>
              <img src={Logo} alt="Logo" className="img-fluid logo-img" />
            </Link>
          </Navbar.Brand>

          {/* Toggle Button */}
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            onClick={() => setExpanded(expanded ? false : true)}
          >
            {expanded ? (
              <span style={{ fontSize: "2rem", lineHeight: "1rem" }}>&times;</span> // 👈 Close icon
            ) : (
              <span className="navbar-toggler-icon"></span> // 👈 Default icon
            )}
          </Navbar.Toggle>

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto align-items-center">
              <Nav.Link onClick={() => handleNavClick("/")}>Home</Nav.Link>
            <Nav.Link onClick={() => handleNavClick("/about")}>About</Nav.Link>
            <Nav.Link onClick={() => handleNavClick("/menu")}>Our Menu</Nav.Link>
            <Nav.Link onClick={() => handleNavClick("/shop")}>Shop</Nav.Link>
            <Nav.Link onClick={() => handleNavClick("/blog")}>Blog</Nav.Link>
            <Nav.Link onClick={() => handleNavClick("/contact")}>Contact</Nav.Link>

              {/* 🛒 Cart Icon with Safe Count */}
              <Nav.Link as={Link}  className="position-relative" onClick={handleCloseNav}>
                <div className="nav-item ms-3">
                  <Button variant="link" className="position-relative p-0" onClick={() => setShowMini(true)}>
                    <i className="bi bi-bag fs-4" ></i>
                    {count() > 0 && <span className="roundpoint">{count()}</span>}
                  </Button>
                </div>
              </Nav.Link>

              {/* 👤 User Login / Profile */}
              {!user ? (
                <Nav.Link as={Link} to="/login" onClick={handleCloseNav}>Login</Nav.Link>
              ) : (
                <NavDropdown
                  title={
                    <img
                      src={user.image || "https://via.placeholder.com/30"}
                      alt="avatar"
                      className="rounded-circle"
                      style={{
                        width: "30px",
                        height: "30px",
                        objectFit: "cover",
                      }}
                    />
                  }
                  id="profile-dropdown"
                  align="end"
                  onClick={handleCloseNav} // 👈 close on select
                >
                  <NavDropdown.Item as={Link} to="/profile" onClick={handleCloseNav}>
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    onClick={() => {
                      logout();
                      handleCloseNav();
                      navigate("/");
                    }}
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <MiniCart show={showMini} onHide={() => setShowMini(false)} />
    </header>
  );
}

export default Header;
