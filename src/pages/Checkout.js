import React, { useContext, useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "../styles/CartStyle.css"; // same CSS file use karlo

export default function Checkout() {
  const { cart, summary, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });
  const [processing, setProcessing] = useState(false);
  const s = summary({ taxRate: 0.05, delivery: cart.length ? 30 : 0, discount: 0 });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.address || !form.email) {
      alert("Please fill name, email, address");
      return;
    }
    setProcessing(true);
    setTimeout(() => {
      const order = { id: `ORD-${Date.now()}`, items: cart, total: s.total, customer: form };
      clearCart();
      setProcessing(false);
      navigate("/order-success", { state: { order } });
    }, 900);
  };

  return (
    <>
      {/* 🔹 Hero Parallax Section */}
      <div className="page-hero">
        <h1>Checkout</h1>
      </div>

      <Container className="py-5">
        <Row>
          <Col md={7}>
            <h3>Billing Details</h3>
            <Form onSubmit={handleSubmit} className="mt-3">
              <Form.Group className="mb-3">
                <Form.Label>Full name</Form.Label>
                <Form.Control value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Delivery address</Form.Label>
                <Form.Control as="textarea" rows={3} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
              </Form.Group>

              <h5 className="mt-4">Payment</h5>
              <Form.Check type="radio" name="pay" label="Pay on Delivery" defaultChecked />
              <Form.Check type="radio" name="pay" label="Card (Mock)" />

              <div className="mt-4 d-grid">
                <Button type="submit" variant="success" disabled={processing}>
                  {processing ? "Placing order..." : `Place Order — ₹ ${s.total.toFixed(2)}`}
                </Button>
              </div>
            </Form>
          </Col>

          <Col md={5}>
            <Card className="p-3">
              <h5>Order Summary</h5>
              <div className="mt-3">
                <div className="d-flex justify-content-between"><small>Subtotal</small><strong>₹ {s.subtotal.toFixed(2)}</strong></div>
                <div className="d-flex justify-content-between"><small>Tax</small><strong>₹ {s.tax.toFixed(2)}</strong></div>
                <div className="d-flex justify-content-between"><small>Delivery</small><strong>₹ {s.delivery.toFixed(2)}</strong></div>
                <hr />
                <div className="d-flex justify-content-between"><strong>Total</strong><strong>₹ {s.total.toFixed(2)}</strong></div>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
