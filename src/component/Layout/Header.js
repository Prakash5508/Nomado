import { useContext, useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo/logo.png";
import { AuthContext } from "../../context/AuthContext";
import "../../styles/HeaderStyle.css";

function Header({ cart = [] }) {
  const [nav, setNav] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const changeValueScroll = () => {
      const scrollValue = document.documentElement.scrollTop;
      setNav(scrollValue >= 80);
    };

    window.addEventListener("scroll", changeValueScroll);
    return () => window.removeEventListener("scroll", changeValueScroll);
  }, []);

  return (
    <header>
      <Navbar collapseOnSelect expand="lg" className={nav ? "sticky" : ""}>
        <Container>
          {/* Logo */}
          <Navbar.Brand as="div">
            <Link to="/" className="logo">
              <img src={Logo} alt="Logo" className="img-fluid logo-img" />
            </Link>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto align-items-center">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/about">About</Nav.Link>
              <Nav.Link as={Link} to="/menu">Our Menu</Nav.Link>
              <Nav.Link as={Link} to="/shop">Shop</Nav.Link>
              <Nav.Link as={Link} to="/blog">Blog</Nav.Link>
              <Nav.Link as={Link} to="/contact">Contact</Nav.Link>

              {/* 🛒 Cart Icon with Safe Count */}
              <Nav.Link as={Link} to="/cart" className="position-relative">
                <div className="cart d-flex align-items-center">
                  <i className="bi bi-bag fs-5"></i>
                  {cart?.length > 0 && (
                    <em className="roundpoint">{cart.length}</em>
                  )}
                </div>
              </Nav.Link>

              {/* 👤 User Login / Profile */}
              {!user ? (
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
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
                >
                  <NavDropdown.Item as={Link} to="/profile">
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    onClick={() => {
                      logout();
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
    </header>
  );
}

export default Header;
