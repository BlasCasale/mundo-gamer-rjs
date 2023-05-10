import React, { useContext } from 'react'
import './CartItem.css'
import { CartContext } from '../../context/cartContext'

const CartItem = ({ item, quantity }) => {
  const { deleteItemOfCart } = useContext(CartContext)

  return (
    <div className='card--cart'>
      <p className='card--p'>{item.name}</p>
      <p className='card--p'>Cantidad: {quantity}</p>
      <p className='price'>${item.price}</p>
      <button onClick={() => deleteItemOfCart(item.id)}>❌</button>
    </div>
  )
}

export default CartItem