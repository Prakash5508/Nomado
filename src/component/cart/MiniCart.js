import React, { useContext } from "react";
import { Offcanvas, Button, Image } from "react-bootstrap";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import "../../styles/CartStyle.css";

export default function MiniCart({ show, onHide }) {
  const { cart, removeItem, updateQuantity, subtotal, count } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <Offcanvas show={show} onHide={onHide} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart ({count()})</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {cart.length === 0 ? (
          <div className="text-center py-4">Your cart is empty.</div>
        ) : (
          <>
            <div className="mini-cart-items">
              {cart.map((it) => {
                return (
                  <div className="mini-item d-flex align-items-center mb-3" key={it.cartId}>
                    <Image src={it.img} rounded style={{ width: 70, height: 70, objectFit: "cover" }} />
                    <div className="ms-2 flex-grow-1">
                      <div className="fw-bold">{it.name}</div>
                      <div className="small text-muted">₹ {it.price} × {it.quantity}</div>
                      <div className="mt-1">
                        <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => updateQuantity(it.cartId, Math.max(1, (it.quantity || 1) - 1))}>-</button>
                        <span className="px-2">{it.quantity}</span>
                        <button className="btn btn-sm btn-outline-secondary ms-2" onClick={() => updateQuantity(it.cartId, (it.quantity || 1) + 1)}>+</button>
                      </div>
                    </div>
                    <button className="btn btn-sm btn-danger" onClick={() => removeItem(it.cartId)}>Remove</button>
                  </div>
                );
              })}
            </div>

            <div className="mt-3">
              <div className="d-flex justify-content-between">
                <strong>Subtotal</strong>
                <strong>₹ {subtotal().toFixed(2)}</strong>
              </div>
              <div className="mt-3 d-grid">
                <Button variant="primary" onClick={() => { onHide(); navigate("/cart"); }}>
                  View Cart & Checkout
                </Button>
              </div>
            </div>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
}
