import { useEffect } from "react";
import { Container, Row, Col, Card, Carousel, Button } from "react-bootstrap";
import AOS from "aos";
import "../styles/HomeStyle.css";
import chef1 from "../assets/parallax/chef1.webp";
import chef2 from "../assets/parallax/chef2.jpg";
import chef3 from "../assets/parallax/chef3.jpg";
import food1 from "../assets/parallax/burger.webp";
import food2 from "../assets/parallax/pizza.jpg";
import food3 from "../assets/parallax/fires.jpg";
import food4 from "../assets/parallax/pasta.jpg";


function About() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-overlay">
          <h1 data-aos="fade-up">Our Story 🍔</h1>
          <p data-aos="fade-up" data-aos-delay="200">
            Serving happiness with every bite since 2005
          </p>
        </div>
      </section>

      {/* Our Story Timeline */}
      <section className="story-timeline">
        <h2 className="section-title">Journey Through Taste</h2>
        <Container>
          <Row>
            <Col md={6} data-aos="fade-right">
              <Card className="timeline-card">
                <h4>2005</h4>
                <p>Started with one food truck 🚚 serving fresh burgers.</p>
              </Card>
            </Col>
            <Col md={6} data-aos="fade-left">
              <Card className="timeline-card">
                <h4>2010</h4>
                <p>Opened our first restaurant 🏢 with 100+ daily visitors.</p>
              </Card>
            </Col>
            <Col md={6} data-aos="fade-right">
              <Card className="timeline-card">
                <h4>2020</h4>
                <p>Expanded to 10+ cities 🌍 bringing joy to thousands.</p>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Food Gallery */}
      <section className="food-gallery">
        <h2 className="section-title">Food We Love</h2>
        <div className="gallery-grid">
          <img src={food1} alt="burger" data-aos="zoom-in" />
          <img src={food2} alt="pizza" data-aos="zoom-in" />
          <img src={food3} alt="fries" data-aos="zoom-in" />
          <img src={food4} alt="pasta" data-aos="zoom-in" />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="features">
        <h2 className="section-title">Why Choose Us?</h2>
        <Container>
          <Row>
            <Col md={3} data-aos="flip-left">
              <div className="feature-box">🥗 Fresh Ingredients</div>
            </Col>
            <Col md={3} data-aos="flip-left" data-aos-delay="200">
              <div className="feature-box">🚀 Quick Delivery</div>
            </Col>
            <Col md={3} data-aos="flip-left" data-aos-delay="400">
              <div className="feature-box">😋 Best Taste</div>
            </Col>
            <Col md={3} data-aos="flip-left" data-aos-delay="600">
              <div className="feature-box">💸 Affordable Price</div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Team Section */}
      <section className="team">
        <h2 className="section-title">Meet Our Chefs</h2>
        <Container>
          <Row>
            <Col md={4} data-aos="fade-up">
              <Card className="team-card">
                <img src={chef1} alt="chef" />
                <h5>Chef Ramesh</h5>
                <p>Specialist in Burgers</p>
              </Card>
            </Col>
            <Col md={4} data-aos="fade-up" data-aos-delay="200">
              <Card className="team-card">
                <img src={chef2} alt="chef" />
                <h5>Chef Anita</h5>
                <p>Expert in Italian</p>
              </Card>
            </Col>
            <Col md={4} data-aos="fade-up" data-aos-delay="400">
              <Card className="team-card">
                <img src={chef3} alt="chef" />
                <h5>Chef John</h5>
                <p>Master of Desserts</p>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <h2 className="section-title">What Our Customers Say</h2>
        <Container>
          <Carousel>
            <Carousel.Item>
              <p>"The burgers are just amazing 😍 Best in town!"</p>
              <small>- Rahul</small>
            </Carousel.Item>
            <Carousel.Item>
              <p>"I love their quick delivery 🚀 and taste!"</p>
              <small>- Priya</small>
            </Carousel.Item>
            <Carousel.Item>
              <p>"Pizza and fries combo is heavenly 😋"</p>
              <small>- Aman</small>
            </Carousel.Item>
          </Carousel>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <h2 data-aos="zoom-in">Ready to Taste Happiness?</h2>
        <Button variant="danger" size="lg">Order Now 🍔</Button>
      </section>
    </div>
  );
}

export default About;
