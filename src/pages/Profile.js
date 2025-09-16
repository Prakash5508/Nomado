import { useContext, useState } from "react";
import { Card, Col, Container, Row, Button, Modal, Form } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";

function Profile() {
  const { user, logout, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showEdit, setShowEdit] = useState(false);
  const [formData, setFormData] = useState(user || {});

  if (!user) {
    return (
      <Container className="mt-5 text-center">
        <h3>Please login to see your profile</h3>
      </Container>
    );
  }

  const handleEdit = () => setShowEdit(true);

  const handleClose = () => {
    setShowEdit(false);
    setFormData(user); // cancel karne par old data hi rakkho
  };

  const handleSave = () => {
    updateUser(formData);
    setShowEdit(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="profile-page">
      {/* Banner */}
      <div className="profile-banner">
        <h2 className="banner-text">Welcome, {user.name} 🍽️</h2>
      </div>

      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="profile-card shadow-lg">
              {/* Profile image */}
              <div className="profile-image-wrapper">
                <img
                  src={user.image || "https://via.placeholder.com/150"}
                  alt="profile"
                  className="profile-img"
                />
              </div>

              {/* Profile basic info */}
              <h3 className="fw-bold mt-3">{user.name}</h3>
              <p className="text-muted">🍴 {user.favoriteCuisine || "Food Lover"}</p>

              <Row className="profile-info">
                <Col md={6}>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Phone:</strong> {user.phone || "N/A"}</p>
                </Col>
                <Col md={6}>
                  <p><strong>Address:</strong> {user.address || "Not Provided"}</p>
                  <p><strong>Favorite Dish:</strong> {user.favoriteDish || "Pizza"}</p>
                </Col>
              </Row>

              {/* About Section */}
              <div className="about-section">
                <h5>About Me</h5>
                <p>
                  {user.bio ||
                    "Foodie at heart ❤️ Always exploring new cuisines and recipes. Big fan of street food, desserts, and home-cooked meals."}
                </p>
              </div>

              {/* Food Preferences */}
              <div className="skills-section">
                <h5>Food Preferences</h5>
                <div className="skills-badges">
                  {(user.foodPreferences || [
                    "Italian",
                    "Indian Spices",
                    "Street Food",
                    "Vegan",
                    "BBQ"
                  ]).map((item, idx) => (
                    <span key={idx} className="skill-badge">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Favorite Restaurants */}
              <div className="skills-section">
                <h5>Favorite Restaurants</h5>
                <div className="skills-badges">
                  {(user.favoriteRestaurants || [
                    "Domino's",
                    "Barbeque Nation",
                    "Haldiram's",
                    "Burger King",
                  ]).map((rest, idx) => (
                    <span key={idx} className="skill-badge rest-badge">
                      {rest}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="action-buttons mt-4">
                <Button variant="primary" className="me-2" onClick={handleEdit}>
                  Edit Profile
                </Button>
                <Button variant="secondary" className="me-2">
                  Settings
                </Button>
                <Button variant="danger" onClick={handleLogout}>
                  Logout
                </Button>
              </div>

              
            </Card>
          </Col>
        </Row>
      </Container>

      {/* 🔹 Edit Profile Modal */}
      <Modal show={showEdit} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Favorite Cuisine</Form.Label>
              <Form.Control
                type="text"
                name="favoriteCuisine"
                value={formData.favoriteCuisine || ""}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Favorite Dish</Form.Label>
              <Form.Control
                type="text"
                name="favoriteDish"
                value={formData.favoriteDish || ""}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="bio"
                value={formData.bio || ""}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={formData.address || ""}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Profile;
