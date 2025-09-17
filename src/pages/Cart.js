import React, { useContext, useState } from "react";
import { Container, Row, Col, Table, Button, Form, Card } from "react-bootstrap";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "../styles/CartStyle.css";
import cartBg from "../assets/parallax/bg.jpg"; 

export default function CartPage() {
  const { cart, updateQuantity, removeItem, subtotal, summary, updateCustomization, clearCart } =
    useContext(CartContext);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "NOMAD20") {
      setDiscount(subtotal() * 0.2);
    } else {
      setDiscount(0);
      alert("Invalid coupon");
    }
  };

  const s = summary({ taxRate: 0.05, delivery: cart.length ? 30 : 0, discount });

  return (
    <div className="cart-page">
      {/* 🔥 Hero Section with Parallax */}
      <section
        className="parallax-section cart-hero"
        style={{ backgroundImage: `url(${cartBg})` }}
      >
        <div className="overlay-dark">
          <Container>
            <h1 className="text-white text-center" data-aos="fade-up">
              🛒 Your Cart
            </h1>
            <p className="text-white text-center" data-aos="fade-up" data-aos-delay="200">
              Review and customize your order before checkout
            </p>
          </Container>
        </div>
      </section>

      {/* Cart Content */}
      <Container className="py-5">
        <Row>
          {/* Cart Items */}
          <Col md={8}>
            <h3>Your Cart</h3>
            {cart.length === 0 ? (
              <Card className="p-4 mt-3 text-center">
                Your cart is empty.{" "}
                <Button variant="link" onClick={() => navigate("/menu")}>
                  Browse menu
                </Button>
              </Card>
            ) : (
              <Table responsive className="mt-3">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Customization</th>
                    <th>Price</th>
                    <th style={{ width: 140 }}>Quantity</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((it) => {
                    const extras =
                      (it.customization?.extraCheese ? 20 : 0) +
                      (it.customization?.extraFries ? 30 : 0) +
                      (it.customization?.extraSauce ? 10 : 0);
                    return (
                      <tr key={it.cartId}>
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              src={it.img}
                              alt={it.name}
                              style={{
                                width: 64,
                                height: 64,
                                objectFit: "cover",
                                borderRadius: 8,
                              }}
                            />
                            <div className="ms-3">
                              <div className="fw-bold">{it.name}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div>
                            <Form.Check
                              type="checkbox"
                              label="Extra Cheese (+₹20)"
                              checked={!!it.customization?.extraCheese}
                              onChange={(e) =>
                                updateCustomization(it.cartId, {
                                  ...it.customization,
                                  extraCheese: e.target.checked,
                                })
                              }
                            />
                            <Form.Check
                              type="checkbox"
                              label="Extra Fries (+₹30)"
                              checked={!!it.customization?.extraFries}
                              onChange={(e) =>
                                updateCustomization(it.cartId, {
                                  ...it.customization,
                                  extraFries: e.target.checked,
                                })
                              }
                            />
                            <Form.Check
                              type="checkbox"
                              label="Extra Sauce (+₹10)"
                              checked={!!it.customization?.extraSauce}
                              onChange={(e) =>
                                updateCustomization(it.cartId, {
                                  ...it.customization,
                                  extraSauce: e.target.checked,
                                })
                              }
                            />
                          </div>
                        </td>
                        <td>₹ {it.price}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              onClick={() =>
                                updateQuantity(it.cartId, Math.max(1, it.quantity - 1))
                              }
                            >
                              -
                            </Button>
                            <Form.Control
                              type="number"
                              value={it.quantity}
                              min={1}
                              onChange={(e) =>
                                updateQuantity(
                                  it.cartId,
                                  Math.max(1, parseInt(e.target.value) || 1)
                                )
                              }
                              style={{ width: 70, marginLeft: 8, marginRight: 8 }}
                            />
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              onClick={() => updateQuantity(it.cartId, it.quantity + 1)}
                            >
                              +
                            </Button>
                          </div>
                        </td>
                        <td>
                          ₹ {((Number(it.price) + extras) * it.quantity).toFixed(2)}
                        </td>
                        <td>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => removeItem(it.cartId)}
                          >
                            Remove
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            )}
          </Col>

          {/* Order Summary */}
          <Col md={4}>
            <Card className="p-3 shadow-sm">
              <h5>Order Summary</h5>
              <div className="d-flex justify-content-between mt-3">
                <div>Subtotal</div>
                <div>₹ {s.subtotal.toFixed(2)}</div>
              </div>
              <div className="d-flex justify-content-between">
                <div>Discount</div>
                <div>- ₹ {s.discount.toFixed(2)}</div>
              </div>
              <div className="d-flex justify-content-between">
                <div>Tax</div>
                <div>₹ {s.tax.toFixed(2)}</div>
              </div>
              <div className="d-flex justify-content-between">
                <div>Delivery</div>
                <div>₹ {s.delivery.toFixed(2)}</div>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold">
                <div>Total</div>
                <div>₹ {s.total.toFixed(2)}</div>
              </div>

              <Form className="mt-3">
                <Form.Control
                  placeholder="Coupon code (NOMAD20)"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                />
                <div className="d-grid mt-2">
                  <Button variant="outline-primary" onClick={applyCoupon}>
                    Apply Coupon
                  </Button>
                </div>
              </Form>

              <div className="d-grid mt-3">
                <Button
                  variant="success"
                  disabled={cart.length === 0}
                  onClick={() => navigate("/checkout")}
                >
                  Proceed to Checkout
                </Button>
              </div>

              <div className="d-grid mt-2">
                <Button
                  variant="outline-danger"
                  onClick={() => {
                    if (window.confirm("Clear cart?")) clearCart();
                  }}
                >
                  Clear Cart
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
