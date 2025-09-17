import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  Nav,
} from "react-bootstrap";
import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/ShopStyle.css";
import bestBurger from "../assets/parallax/patty.webp"; // you already have patty.webp; optional

// NOTE: component expects (cart, setCart) props from App.js so header cart updates.
// <Shop cart={cart} setCart={setCart} />
function Shop({ cart = [], setCart = () => {} }) {
  const [activeTab, setActiveTab] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [selectedProd, setSelectedProd] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [custom, setCustom] = useState({ extraCheese: false, extraSauce: false, spicy: false });

  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  // product data — you can replace images with your assets
  const productsByCategory = {
    Burgers: [
      { id: "b1", name: "Classic Nomad Burger", price: 199, img: "https://source.unsplash.com/600x400/?burger" },
      { id: "b2", name: "Cheese Loaded Burger", price: 249, img: "https://source.unsplash.com/601x400/?cheeseburger" },
      { id: "b3", name: "Double Patty Burger", price: 299, img: "https://source.unsplash.com/602x400/?doubleburger" },
    ],
    Pizza: [
      { id: "p1", name: "Margherita Pizza", price: 299, img: "https://source.unsplash.com/603x400/?pizza" },
      { id: "p2", name: "Pepperoni Supreme", price: 399, img: "https://source.unsplash.com/604x400/?pepperoni" },
      { id: "p3", name: "Veggie Delight Pizza", price: 349, img: "https://source.unsplash.com/605x400/?vegpizza" },
    ],
    Snacks: [
      { id: "s1", name: "Crispy French Fries", price: 99, img: "https://source.unsplash.com/606x400/?fries" },
      { id: "s2", name: "Cheesy Nachos", price: 149, img: "https://source.unsplash.com/607x400/?nachos" },
      { id: "s3", name: "Chicken Wings", price: 179, img: "https://source.unsplash.com/608x400/?chicken-wings" },
    ],
    Drinks: [
      { id: "d1", name: "Cold Coffee", price: 149, img: "https://source.unsplash.com/609x400/?cold-coffee" },
      { id: "d2", name: "Mojito", price: 129, img: "https://source.unsplash.com/610x400/?mojito" },
      { id: "d3", name: "Coca Cola", price: 59, img: "https://source.unsplash.com/611x400/?coke" },
    ],
    Desserts: [
      { id: "ds1", name: "Chocolate Lava Cake", price: 199, img: "https://source.unsplash.com/612x400/?chocolate-cake" },
      { id: "ds2", name: "Ice Cream Sundae", price: 149, img: "https://source.unsplash.com/613x400/?icecream" },
      { id: "ds3", name: "Brownie Bites", price: 129, img: "https://source.unsplash.com/614x400/?brownie" },
    ],
  };

  const categories = ["All", ...Object.keys(productsByCategory)];

  // flatten for "All"
  const allProducts = Object.values(productsByCategory).flat();

  const handleOpenModal = (prod) => {
    setSelectedProd(prod);
    setQuantity(1);
    setCustom({ extraCheese: false, extraSauce: false, spicy: false });
    setShowModal(true);
  };

  const handleAddToCart = () => {
    // combine product + chosen options
    const cartItem = {
      ...selectedProd,
      quantity,
      custom,
      cartId: `${selectedProd.id}_${Date.now()}`,
    };
    setCart([...cart, cartItem]);
    setShowModal(false);
    // small visual feedback: add temporary class to header badge could be implemented in Header
  };

  // recommended images (you can download & place in /assets/parallax):
  // food-market: https://source.unsplash.com/1600x900/?food-market
  // juicy-burger: https://source.unsplash.com/1600x900/?burger,closeup
  // pizza-shot: https://source.unsplash.com/1600x900/?pizza,cheese
  // cafe-shelf: https://source.unsplash.com/1600x900/?cafe,shop

  return (
    <div className="shop-page">
      {/* HERO (parallax) */}
      <section className="shop-hero parallax-hero">
        <div className="hero-content" data-aos="fade-up">
          <h1>Nomad Burger Shop</h1>
          <p>Order happiness — fresh, fast & flavorful.</p>
          <div className="hero-ctas">
            <Button variant="warning" size="lg" onClick={() => setActiveTab && setActiveTab("All")}>
              Explore Menu
            </Button>
            <Button variant="outline-light" size="lg" className="ms-3" onClick={() => setActiveTab && setActiveTab("Burgers")}>
              Best Burgers
            </Button>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <Container className="mt-5">
        <Nav variant="pills" className="justify-content-center shop-tabs" activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
          {categories.map((cat) => (
            <Nav.Item key={cat}>
              <Nav.Link eventKey={cat}>{cat}</Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </Container>

      {/* Products grid */}
      <section className="products-section">
        <Container>
          <Row className="g-4 mt-2">
            {(activeTab === "All" ? allProducts : productsByCategory[activeTab]).map((prod, idx) => (
              <Col md={4} sm={6} xs={12} key={prod.id} data-aos="fade-up" data-aos-delay={idx * 80}>
                <Card className="product-card">
                  <div className="product-img-wrap">
                    <Card.Img src={prod.img} className="product-img" />
                    <div className="quick-badge">Popular</div>
                  </div>
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <Card.Title className="mb-1">{prod.name}</Card.Title>
                        <Card.Text className="text-muted small">{prod.category || ""}</Card.Text>
                      </div>
                      <div className="text-end">
                        <div className="price">₹ {prod.price}</div>
                        <Button variant="danger" size="sm" className="mt-2" onClick={() => handleOpenModal(prod)}>Add</Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Best Seller Parallax */}
      <section className="best-seller parallax-bg">
        <div className="overlay">
          <Container>
            <Row className="align-items-center">
              <Col md={6} data-aos="fade-right">
                <img src={bestBurger} alt="best burger" className="img-fluid rounded shadow-lg" />
              </Col>
              <Col md={6} data-aos="fade-left">
                <h2>🔥 Best Seller — Patty Royale</h2>
                <p className="lead">Juicy double patty, caramelized onions, melty cheese and our secret sauce. Try it today.</p>
                <Button variant="warning" onClick={() => handleOpenModal(allProducts[0])}>Order Now</Button>
              </Col>
            </Row>
          </Container>
        </div>
      </section>

      {/* Promo / Offer */}
      <section className="promo-section">
        <Container>
          <Row className="align-items-center">
            <Col md={8} data-aos="fade-up">
              <h3>Friday Pizza Offer</h3>
              <p>Flat <strong>20% OFF</strong> on all pizzas every Friday. Use code <strong>FRIDAY20</strong>.</p>
            </Col>
            <Col md={4} className="text-end" data-aos="fade-up" data-aos-delay={200}>
              <Button variant="danger">Grab Offer</Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Why Shop With Us */}
      <section className="why-shop">
        <Container>
          <h2 className="text-center mb-4" data-aos="fade-up">Why Shop With Nomad</h2>
          <Row className="g-4">
            <Col md={3} sm={6} data-aos="fade-up">
              <div className="why-box">
                <i className="bi bi-egg-fried"></i>
                <h5>Fresh Ingredients</h5>
                <p>Daily fresh supply from trusted vendors.</p>
              </div>
            </Col>
            <Col md={3} sm={6} data-aos="fade-up" data-aos-delay={100}>
              <div className="why-box">
                <i className="bi bi-speedometer2"></i>
                <h5>Fast Delivery</h5>
                <p>Hot & quick to your doorstep.</p>
              </div>
            </Col>
            <Col md={3} sm={6} data-aos="fade-up" data-aos-delay={200}>
              <div className="why-box">
                <i className="bi bi-star"></i>
                <h5>Top Rated</h5>
                <p>Loved by customers across the city.</p>
              </div>
            </Col>
            <Col md={3} sm={6} data-aos="fade-up" data-aos-delay={300}>
              <div className="why-box">
                <i className="bi bi-wallet2"></i>
                <h5>Great Prices</h5>
                <p>Tasty food that won’t burn your pocket.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Parallax */}
      <section className="cta-parallax">
        <div className="overlay-cta">
          <Container className="text-center">
            <h2 data-aos="zoom-in">Hungry? Let’s Order!</h2>
            <p data-aos="zoom-in" data-aos-delay={150}>Fast delivery & fresh taste — every single time.</p>
            <Button variant="warning" size="lg" data-aos="zoom-in" data-aos-delay={300} onClick={() => setActiveTab && setActiveTab("All")}>Order Now</Button>
          </Container>
        </div>
      </section>

      {/* Product Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedProd?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProd && (
            <>
              <img src={selectedProd.img} alt={selectedProd.name} className="img-fluid rounded mb-3" />
              <p className="mb-1">Price: <strong>₹ {selectedProd.price}</strong></p>

              <Form.Group className="mb-3">
                <Form.Label>Quantity</Form.Label>
                <Form.Control type="number" value={quantity} min={1} onChange={(e) => setQuantity(parseInt(e.target.value) || 1)} />
              </Form.Group>

              <Form.Check type="checkbox" label="Extra Cheese (+₹20)" checked={custom.extraCheese} onChange={(e) => setCustom({ ...custom, extraCheese: e.target.checked })} />
              <Form.Check type="checkbox" label="Extra Sauce (+₹10)" checked={custom.extraSauce} onChange={(e) => setCustom({ ...custom, extraSauce: e.target.checked })} />
              <Form.Check type="checkbox" label="Make it Spicy 🌶️" checked={custom.spicy} onChange={(e) => setCustom({ ...custom, spicy: e.target.checked })} />
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="success" onClick={handleAddToCart}>Add to Cart 🛒</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Shop;
