import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { CartContext } from '../../context/cartContext'
import { LoginContext } from '../../context/loginContext'
import CartItem from '../CartItem/CartItem'
import './Cart.css'

const Cart = () => {
    const { cart, emptyCart } = useContext(CartContext)

    const { loged } = useContext(LoginContext)

    const totalCart = cart.reduce((total, product) => total + product.quantity, 0)

    const totalAmount = cart.reduce((total, product) => total + (product.item.price * product.quantity), 0)

    if (totalCart === 0) {
        return (
            <>
                <h2>No hay productos en el carrito</h2>
                <Link to='/'>Productos</Link>
            </>
        )
    }

    return (
        <div className='cart--container'>
            {
                cart.map(product => <CartItem key={product.item.id} {...product} />)
            }
            <h3>Total: ${totalAmount}</h3>
            <button onClick={() => emptyCart()} className='empty--cart'>Vaciar carrito</button>

            {loged ? <Link to='/checkout'>Finalizar compra</Link> : <div className='box--session'> <p className='box--session-p'>Por favor inicia sesión para completar la compra</p> <Link to='/login'>Inicia sesión</Link> </div>}

        </div>
    )
}

export default Cart