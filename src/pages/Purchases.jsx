import React, { useEffect } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPurchasesThunk } from '../store/slices/purchases.slice';

const Purchases = () => {

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const purchases = useSelector(state => state.purchases)

    useEffect(() => {
        dispatch(getPurchasesThunk())
    }, [])

    return (
        <div>
            <h1>Purchases</h1>
            <ListGroup>
                {
                purchases.map(purchase => (
                    <ListGroup.Item key={purchase.id} >
                    {
                        purchase.cart.products.map(product => (
                            <div key={product.id} onClick={() => navigate(`/products/${product.id}`)}>
                                {product.title}
                            </div>
                        ))
                    }
                </ListGroup.Item>
                ))}
              


            </ListGroup>
        </div>
    );
};

export default Purchases;