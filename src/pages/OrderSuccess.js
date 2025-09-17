import React, { useEffect, useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import "../styles/CartStyle.css"; // CSS same rakho

export default function OrderSuccess() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const order = state?.order;

  // 🔹 Confetti ke liye window size handle
  const [windowDimension, setWindowDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!order) {
    return (
      <>
        <div className="page-hero">
          <h1>Order Status</h1>
        </div>
        <Container className="py-5 text-center">
          <h3>No recent order found.</h3>
          <Button onClick={() => navigate("/")}>Back to Home</Button>
        </Container>
      </>
    );
  }

  return (
    <>
      {/* 🎉 Confetti Effect */}
      <Confetti
        width={windowDimension.width}
        height={windowDimension.height}
        numberOfPieces={250}
        recycle={false}
      />

      {/* 🔹 Hero Parallax Section */}
      <div className="page-hero">
        <h1>Order Confirmed</h1>
      </div>

      <Container className="py-5">
        <Card className="p-4 text-center">
          <h2>✅ Order Placed Successfully</h2>
          <p className="lead">
            Order ID: <strong>{order.id}</strong>
          </p>
          <p>
            We are preparing your order. Confirmation sent to{" "}
            <strong>{order.customer.email}</strong>
          </p>
          <Button variant="primary" onClick={() => navigate("/")}>
            Continue Shopping
          </Button>
        </Card>
      </Container>
    </>
  );
}
