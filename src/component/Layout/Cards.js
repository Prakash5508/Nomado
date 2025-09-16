import React from 'react'
import { Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Cards({image, rating, title, paragraph, price, renderRating}) {
  return (
    <Col sm={6} lg={4} xl={3} className="mb-4"> 
        <Card className='overflow-hidden'>
            <div className='overflow-hidden'>
                <Card.Img variant='top' src={image}/>
            </div>
            <Card.Body>
                <div className='d-flex align-items-center justify-content-between'>
                    <div className='item_rating'>{renderRating(rating)}</div>
                    <div className='wishlist'>
                        <i className="bi bi-heart"></i>
                    </div>
                </div>
            <Card.Title>{title}</Card.Title>
            <Card.Text>{paragraph}</Card.Text>

            <div className='d-flex align-items-center justify-content-between'>
                <div className='menu_price'>
                    <h5 className='mb-0'>${price}</h5>
                </div>
                <div className='add_to_card'>
                    <Link to="/">
                        <i className="bi bi-bag me-2" > &nbsp;Add To Cart</i>
                    </Link>
                </div>
            </div>
            </Card.Body>
        </Card>
    </Col>
  )
}

export default Cards
