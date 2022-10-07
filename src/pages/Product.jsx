import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { addCartThunk } from '../store/slices/cartProducts.slice';

const Product = () => {
    
    const { id } = useParams()
    
    const [amount, setAmount] = useState(1)

    const dispatch = useDispatch()

    const productsList = useSelector(state => state.products)

    const productDetail = productsList.find(product => product.id === Number(id))

    const relatedProducts = productsList.filter(product => product.category.id === productDetail.category.id)

    const [quantity, setQuantity] = useState(0)

    const add = () => {
        const product = {
            id: id,
            quantity: quantity
        }
        dispatch(addCartThunk(product))
    }

    useEffect(() => {
        setQuantity(0)
    }, [id])
    
    return (
        <Row>
            <Col>
                <img className='img-fluid' src={productDetails?.productImgs} width="600px" alt="" />
            </Col>
            <Col>
                <div>
                    <h1>Products Details: {id}</h1>
                    <h2>{productDetails?.title}</h2>
                    <p>{productDetails?.description}</p>
                </div>
                <div className='amount'>
                    <Button disabled={amount <= 1} className='me-3' onClick={() => setAmount(amount-1)}>
                        -
                    </Button>
                    {amount}
                    <Button className='ms-3' onClick={() => setAmount(amount+1)}>
                        +
                    </Button>

                    <Button className='ms-5' onClick={addToCart}>Add to cart</Button>
                </div>
            </Col>
            <div className='releated-products-container'>
                <ul>
                    {
                        releatedProducts2.map(product => (
                            <Link key={product.id} to={`/products/${product.id}`}><li>{product.title}</li></Link>
                        ))
                    }
                </ul>
            </div>
        </Row>
    );
};

export default Product;