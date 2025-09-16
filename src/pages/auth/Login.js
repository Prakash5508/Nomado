import { useContext, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "../../styles/AuthStyle.css";

function Login() {
  const { setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("userData"));

    if (!storedUser) {
      alert("⚠️ No account found. Please signup first!");
      return;
    }

    if (storedUser.email !== formData.email) {
      alert("❌ Email does not match our records!");
      return;
    }

    if (storedUser.password !== formData.password) {
      alert("❌ Password is incorrect!");
      return;
    }

    // ✅ Success
    setUser(storedUser);
    alert("✅ Login successful!");
    navigate("/profile");
  };

  return (
    <div className="auth-page parallax-bg">
      <Container>
        <Row className="justify-content-center">
          <Col md={6} className="auth-box animate-fade">
            <h2 className="text-center mb-4">Login</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Login
              </Button>
            </Form>
            <p className="mt-3 text-center">
              Don’t have an account? <Link to="/signup">Signup</Link>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
