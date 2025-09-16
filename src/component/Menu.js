import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Modal, Form, Nav } from "react-bootstrap";
import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/HomeStyle.css";
import patty from "../assets/parallax/patty.webp";
import burger1 from "../assets/parallax/burger.webp";
import burger2 from "../assets/parallax/patty.webp";
import burger3 from "../assets/menu/burger-12.jpg"
import pizza1 from "../assets/parallax/pizza.jpg";
import pizza2 from "../assets/menu/pizza1.webp";
import veggie from "../assets/menu/veggie.avif";
import fries from "../assets/parallax/fires.jpg";
import nachos from "../assets/menu/nachos.jpg";
import bread from "../assets/menu/bread.jpg";
import coffee from "../assets/menu/coffie.jpg";
import mojito from "../assets/menu/mojito.webp";
import cola from "../assets/menu/cola.png";


function Menu({ cart, setCart }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("All");
  const [customization, setCustomization] = useState({
    extraCheese: false,
    extraFries: false,
    spicy: false,
  });

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // 🍔 Menu Data by Categories
  const categories = {
    Burgers: [
      { id: 1, name: "Classic Nomad Burger", price: 199, img: burger3 },
      { id: 2, name: "Cheese Loaded Burger", price: 249, img: burger2 },
      { id: 3, name: "Double Patty Blast", price: 299, img: burger1 },
    ],
    Pizzas: [
      { id: 4, name: "Margherita Pizza", price: 299, img: pizza2 },
      { id: 5, name: "Pepperoni Pizza", price: 349, img: pizza1 },
      { id: 6, name: "Veggie Delight Pizza", price: 329, img: veggie },
    ],
    Snacks: [
      { id: 7, name: "French Fries", price: 99, img: fries },
      { id: 8, name: "Cheesy Nachos", price: 149, img: nachos },
      { id: 9, name: "Garlic Bread", price: 129, img: bread },
    ],
    Drinks: [
      { id: 10, name: "Cold Coffee", price: 149, img: coffee },
      { id: 11, name: "Mojito", price: 129, img: mojito },
      { id: 12, name: "Coca Cola", price: 59, img: cola },
    ],
  };

  // "All" ke liye saare categories merge
  const allItems = Object.values(categories).flat();

  const handleOrderClick = (item) => {
    setSelectedItem(item);
    setQuantity(1);
    setCustomization({ extraCheese: false, extraFries: false, spicy: false });
    setShowModal(true);
  };

  const addToCart = () => {
    const order = {
      ...selectedItem,
      quantity,
      customization,
    };
    setCart([...cart, order]);
    setShowModal(false);
  };

  return (
    <div className="menu-page">
      {/* Hero Section */}
      <section className="menu-hero">
        <div className="hero-overlay">
          <h1 data-aos="fade-up">Our Menu 🍽️</h1>
          <p data-aos="fade-up" data-aos-delay="200">Fresh. Juicy. Delicious.</p>
        </div>
      </section>

      {/* Category Tabs */}
      <Container className="mt-5">
        <Nav variant="tabs" activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
          <Nav.Item><Nav.Link eventKey="All">All</Nav.Link></Nav.Item>
          {Object.keys(categories).map((cat) => (
            <Nav.Item key={cat}><Nav.Link eventKey={cat}>{cat}</Nav.Link></Nav.Item>
          ))}
        </Nav>
      </Container>

      {/* Category-wise Menu (with filtering) */}
      <section className="menu-section">
        <Container>
          <Row>
            {(activeTab === "All" ? allItems : categories[activeTab]).map((item, i) => (
              <Col md={4} sm={6} xs={12} key={item.id} data-aos="zoom-in" data-aos-delay={i * 200}>
                <Card className="menu-card shadow-sm">
                  <div className="menu-img-wrapper">
                    <Card.Img variant="top" src={item.img} className="menu-img" />
                  </div>
                  <Card.Body className="text-center">
                    <Card.Title className="fw-bold">{item.name}</Card.Title>
                    <Card.Text className="text-danger fw-bold">₹ {item.price}</Card.Text>
                    <Button variant="dark" className="order-btn" onClick={() => handleOrderClick(item)}>
                      Order Now
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Today’s Special with Parallax */}
      <section className="parallax-section special-bg">
        <div className="overlay-dark">
          <Container>
            <h2 className="section-title" data-aos="fade-up" style={{ color: "white" }}>🔥 Today’s Special</h2>
            <Row>
              <Col md={6} data-aos="fade-right">
                <img src={patty} alt="special" className="img-fluid rounded shadow-lg" />
              </Col>
              <Col md={6} className="text-white d-flex flex-column justify-content-center" data-aos="fade-left">
                <h3>Double Patty Cheese Blast</h3>
                <p>Our chef’s special with double patty, extra cheese & spicy sauce. Limited for today only!</p>
                <Button variant="warning" size="lg">Order Now</Button>
              </Col>
            </Row>
          </Container>
        </div>
      </section>

      {/* Why Choose Us with Parallax */}
      <section className="parallax-section choose-bg">
        <div className="overlay-dark">
          <Container>
            <h2 className="section-title text-white" data-aos="fade-up">Why Choose Us? 🍴</h2>
            <Row className="text-center">
              <Col md={4} data-aos="zoom-in">
                <Card className="choose-card">
                  <Card.Body>
                    <i className="bi bi-basket2"></i>
                    <h4>Fresh Ingredients</h4>
                    <p>We use 100% fresh veggies, buns & patties every single day.</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4} data-aos="zoom-in" data-aos-delay="200">
                <Card className="choose-card">
                  <Card.Body>
                    <i className="bi bi-truck"></i>
                    <h4>Fast Delivery</h4>
                    <p>Get your hot & fresh burger delivered within 30 minutes.</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4} data-aos="zoom-in" data-aos-delay="400">
                <Card className="choose-card">
                  <Card.Body>
                    <i className="bi bi-cash-coin"></i>
                    <h4>Best Price</h4>
                    <p>Delicious taste that doesn’t hurt your pocket.</p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </section>

      {/* Order Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Customize Your Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem && (
            <>
              <h5>{selectedItem.name}</h5>
              <p>Price: ₹ {selectedItem.price}</p>

              <Form.Group className="mb-3">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  value={quantity}
                  min="1"
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                />
              </Form.Group>

              <Form.Check
                type="checkbox"
                label="Extra Cheese (+₹20)"
                checked={customization.extraCheese}
                onChange={(e) => setCustomization({ ...customization, extraCheese: e.target.checked })}
              />
              <Form.Check
                type="checkbox"
                label="Extra Fries (+₹30)"
                checked={customization.extraFries}
                onChange={(e) => setCustomization({ ...customization, extraFries: e.target.checked })}
              />
              <Form.Check
                type="checkbox"
                label="Make it Spicy 🌶️"
                checked={customization.spicy}
                onChange={(e) => setCustomization({ ...customization, spicy: e.target.checked })}
              />
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="success" onClick={addToCart}>Add to Cart 🛒</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Menu;
