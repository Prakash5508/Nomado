import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import Burger from '../../assets/hero/hero-2.png';

function Section1() {
  return (
    <section className='hero_section'>
        <Container>
            <Row>
                <Col lg={7} className="mb-5 mb-lg-0">
                    <div className="position-relative">
                        <img src={Burger} className="img-fluid" alt="Hero" />
                        <div className='price_badge'>
                            <div className='badge_text'>
                                <h4 className='h4_x5'>Only</h4>
                                <h2 className='h3_lg'>$5.99</h2>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col lg={5} className='hero_text text-center'>
                    <h1 className='text-white'>New Burger</h1>
                    <h2 className='text-white'>Delicious</h2>
                    <p className='text-white'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at est id ligula facilisis lacinia. Nulla facilisi.</p>
                    <Link to={"/"} className="order_now">
                        Order Now
                    </Link>
                </Col>
            </Row>
        </Container>
    </section>
  )
}

export default Section1
