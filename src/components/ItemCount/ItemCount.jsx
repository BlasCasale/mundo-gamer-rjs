import React from 'react'
import './ItemCount.css'
import { useState } from 'react'

const ItemCount = ({ initial, stock, addFunction }) => {
    const [counter, setCounter] = useState(initial)

    const addCounter = () => {
        if (counter < stock) {
            setCounter(counter + 1)
        }
    }

    const substractCounter = () => {
        if (counter > initial) {
            setCounter(counter - 1)
        }
    }

    return (
        <>
            {stock === 0 ? <p className='card--p'>No hay stock</p> : (
                <>

                    <div className='card__btn'>

                        <button className='card--btn' onClick={substractCounter}>-</button>

                        <strong>{counter}</strong>

                        <button className='card--btn' onClick={addCounter}>+</button>

                    </div>

                    <button className='add--btn' onClick={() => addFunction(counter)}>Agregar al carrito</button>
                </>
            )}
        </>
    )
}

export default ItemCount