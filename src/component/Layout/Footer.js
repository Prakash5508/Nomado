import React, {useState, useEffect} from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Footer() {
  // Scroll to top function
  const [isVisible, setIsVisible] = useState(false);
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const listenToScroll = () => {
    let heightToHidden = 7100;
    const windowScroll = document.body.scrollTop || document.documentElement.scrollTop;

    windowScroll > heightToHidden ? setIsVisible(true) : setIsVisible(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
});


  return (
    <>
    <footer>
        <Container>
            <Row>
                <Col sm={6} lg={3} className='mb-4 mb-lg-0'>
                <div className='text-center'>
                  <h5>Location</h5>
                  <p>201301 Gautam BudhNagar</p>
                  <p>Noida, Uttar Pradesh</p>
                  <p>India</p>
                </div>
                </Col>
                <Col sm={6} lg={3} className='mb-4 mb-lg-0'>
                <div className='text-center'>
                  <h5>Working Hours</h5>
                  <p>Mon-Fri: 9:00AM - 10:00PM</p>
                  <p>Saturday: 10:00AM - 5:00PM</p>
                  <p>Sunday: 12:00PM - 5:00PM</p>
                </div>
                </Col>
                <Col sm={6} lg={3} className='mb-4 mb-lg-0'>
                <div className='text-center'>
                  <h5>Order Now</h5>
                  <p>With Exclusive Offer </p>
                  <p>
                    <Link to="tel:999888777" className='calling'>
                    999-888-777
                    </Link>
                  </p>                  
                </div>
                </Col>
                <Col sm={6} lg={3} className='mb-4 mb-lg-0'>
                <div className='text-center'>
                   <h5>Follow Us</h5>
                   <p>For Exclusive Offer </p>
                   <ul className='list-unstyled  mt-2'>
                    <li>
                    <Link to="/">
                    <i className='bi bi-facebook'></i>
                    </Link>
                    </li>
                    <li>
                    <Link to="/">
                    <i className='bi bi-instagram'></i>
                    </Link>
                    </li>
                    <li>
                    <Link to="/">
                    <i className='bi bi-youtube'></i>
                    </Link>
                    </li>  
                    <li>
                    <Link to="/">
                    <i className='bi bi-twitter'></i>
                    </Link>
                    </li>                  
                   </ul>             
                </div>
                </Col>
            </Row>
            <Row className='copy'>
              <Col>
              <div>
                <ul>
                  <li>
                    <Link to="/" className='text-decoration-none' style={{color: 'gray'}}>
                    &copy; 2025 <span>Perfect</span>. All Rights Reserved.
                    </Link>
                    </li>
                    <li>
                    <Link to="/" className="text-decoration-none" style={{color: 'gray'}}>About Us</Link>
                    </li>
                    <li>
                    <Link to="/" className="text-decoration-none" style={{color: 'gray'}}>Terms & Conditions</Link>
                    </li>
                    <li>
                    <Link to="/" className="text-decoration-none" style={{color: 'gray'}}>Privacy Policy</Link>
                    </li>
                </ul>
              </div>
              </Col>
            </Row>
        </Container>
    </footer>

    {/* Scroll to top button */}
    {isVisible && (
      <div className="scroll_top" onClick={scrollTop}>
        <i class="bi bi-arrow-up"></i>
      </div>
    )}
    


    </>


  )
}

export default Footer
