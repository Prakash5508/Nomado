import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import PromotionImage from "../../assets/promotion/pro.png"


function Section4() {
  return (
    <>
    <section className='promotion_section'>
      <Container>
        <Row className='align-items-center'>
          <Col lg={6} className='text-center mb-5 mb-lg-0'>
            <img src={PromotionImage} alt="Promotion" className='img-fluid' />
          </Col>
          <Col lg={6} className='px-5'>
            <h2>Nothing brings people together like a good burger</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus eos sit, earum quasi temporibus animi voluptatum sint ab ad, tempore perferendis incidunt hic. Cupiditate, nemo.</p>

            <ul>
              <li>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto ad est aliquid, vel nobis excepturi.</p>
              </li>
              <li>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
              </li>
              <li>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto ad est aliquid, vel nobis excepturi.<a href='https://www.instagram.com/prakash_kr_08/' className='pratag'>Prakash</a></p>
              
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </section>
    
    {/* BG Paralax Scroll */}
    <section className='bg_paralax_scroll'></section>
    </>
  )
}

export default Section4
