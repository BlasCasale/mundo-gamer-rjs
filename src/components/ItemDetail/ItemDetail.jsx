import React from 'react'
import ItemCount from '../ItemCount/ItemCount'
import { useState, useContext } from 'react'
import { CartContext } from '../../context/cartContext'
import LinkDetail from '../LinkDetail/LinkDetail'

const ItemDetail = ({ id, name, price, img, stock, desc }) => {
  const [addQuantity, setAddQuantity] = useState(0)

  const { addToCart } = useContext(CartContext)

  const handlerQuantity = (quantity) => {
    setAddQuantity(quantity)

    const item = { id, name, price }

    addToCart(item, quantity)
  }

  return (
    <div className='card'>

      <p className='card--p'>{name}</p>

      <p className='price'>${price}</p>

      <img src={img} alt={name} className='card--img' />

      <p className=''>{desc}</p>

      {
        addQuantity > 0 ? (<LinkDetail />) : (<ItemCount initial={1} stock={stock} addFunction={handlerQuantity} />)
      }

    </div>
  )
}

export default ItemDetail