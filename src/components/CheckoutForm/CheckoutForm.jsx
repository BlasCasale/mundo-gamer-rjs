import React from 'react'
import { useState, useContext, useEffect } from 'react'
import { CartContext } from '../../context/cartContext'
import { LoginContext } from '../../context/loginContext'
import { db } from '../../service/firebase/config'
import { collection, addDoc, doc, updateDoc, query, onSnapshot } from 'firebase/firestore'
import { OrderContext } from '../../context/orderContext'

const CheckoutForm = () => {

    const { cart, emptyCart } = useContext(CartContext)

    const { loged } = useContext(LoginContext)

    const { placeOrder } = useContext(OrderContext)

    const [error, setError] = useState("")

    const [products, setProducts] = useState([])

    useEffect(() => {
        const q = query(collection(db, "products"))

        const modify = onSnapshot(q, function (querySnapshot) {
            const docs = []
            querySnapshot.forEach(function (doc) {
                docs.push({ id: doc.id, ...doc.data() })
            })
            setProducts(docs)
        })
        return () => {
            modify()
        }
    }, [])

    const changeStock = (id, quantity) => {
        const productRef = doc(db, "products", id)
        const product = products.find(prod => prod.id === id)
        if (product) {
            updateDoc(productRef, { stock: product.stock - quantity })
                .then(() => console.log(`Se compro ${productRef}`))
                .catch((error) => console.error(error))

        }
    }

    const handlerSubmit = (e) => {
        e.preventDefault()
        const date = new Date()

        const day = date.getDay()
        const month = date.getMonth()
        const year = date.getFullYear()

        const order = {
            items: cart.map((prod) => ({
                id: prod.item.id,
                name: prod.item.name,
                quantity: prod.quantity
            })),
            totalAmount: cart.reduce((total, prod) => total + prod.item.price * prod.quantity, 0),
            name: loged.name,
            lastname: loged.lastname,
            cellphone: loged.cellphone,
            email: loged.email,
            date: `${day}/${month}/${year}`
        }

        order.items.map(prod => (changeStock(prod.id, prod.quantity)))

        addDoc(collection(db, "orders"), order)
            .then((docRef) => {
                placeOrder(docRef.id)
                emptyCart()
                setError("")
            })
            .catch((error) => {
                console.error(error)
                setError("Se produjo un error al completar la compra, intente mas tarde.")
            })
    }

    return (
        <>
            <h2 className='title--checkout'>Orden de compra:</h2>

            <div className='box--item'>
                {cart.map((prod) => (
                    <div key={prod.item.id} className='card--cart'>
                        <p className='card--p'>{prod.item.name}</p>
                        <p className="card--p">Cantidad: {prod.quantity}</p>
                        <p className='price'>${prod.item.price}</p>
                    </div>
                ))}
            </div>

            <form onSubmit={handlerSubmit} className='form--checkout'>
                <legend className='legend--checkout'>Datos de la compra:</legend>

                <input className='input--form' type="text" value={loged.name} readOnly />

                <input className='input--form' type="text" value={loged.lastname} readOnly />

                <input className='input--form' type="text" value={loged.email} readOnly />

                <input className='input--form' type="number" value={loged.cellphone} readOnly />

                <button type='submit' className='form--btn'>Confirmar compra</button>
            </form>

            {error && (<p>{error}</p>)}
        </>
    )
}

export default CheckoutForm
