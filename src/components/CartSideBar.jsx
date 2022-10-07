import React, { useEffect } from "react"
import { Button, Offcanvas } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { checkoutThunk, getCartProductsThunk } from "../store/slices/cartProducts.slice"
const CartSideBar = ({ show, handleClose }) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCartProductsThunk())
    }, [])

    const cartProducts = useSelector(state => state.cartProducts)


    return (

        <Offcanvas show={show} onHide={handleClose} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Your Cart</Offcanvas.Title>
            </Offcanvas.Header>
            {
                cartProducts.map(product => (
                    <div key = {product.id}>
                        <Link to={`/product/${product.id}`} key={product.id}>
                            {product.title}
                        </Link>

                        <Button>Delete</Button>
                    </div>
                ))
            }
            <Button onClick={() => dispatch(checkoutThunk())}>Checkout</Button>
        </Offcanvas>

    )
}

export default CartSideBar