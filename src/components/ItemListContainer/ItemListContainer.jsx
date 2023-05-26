import React from 'react'
import './ItemListContainer.css'
import { useEffect, useState } from 'react'
import ItemList from '../ItemList/ItemList'
import { useParams } from 'react-router-dom'
import { collection, getDocs, where, query } from 'firebase/firestore'
import { db } from '../../service/firebase/config'

const ItemListContainer = () => {

  const [products, setProduct] = useState([])

  const [input, setInput] = useState({ name: "", price: "" })

  const { category } = useParams()

  const handleInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  const getAllProducts = (collection) => {
    getDocs(collection)
      .then(res => {
        const newProduct = res.docs.map(doc => {
          const data = doc.data()
          return { id: doc.id, ...data }
        })
        setProduct(newProduct)
      })
      .catch(error => console.log(error))
  }

  const filterProductsByName = () => {
    const duplicate = products

    const myProduct = duplicate.filter((prod) => prod.name.toLowerCase().includes(input.name.toLowerCase()))

    if (myProduct.length > 0) {
      setProduct(myProduct)
    } else {
      const myProducts = collection(db, "products")

      getAllProducts(myProducts)
    }
  }

  const filterProductsByPrice = () => {
    const duplicate = products

    const myProduct = duplicate.filter(prod => prod.price >= input.price)

    if (myProduct.length > 0 && input.price >= 3500 && input.price <= 38000) {
      setProduct(myProduct)
    } else {
      const myProducts = collection(db, "products")

      getAllProducts(myProducts)
    }
  }

  useEffect(() => {
    const myProducts = category ? query(collection(db, "products"), where("category", "==", category)) : collection(db, "products")

    getAllProducts(myProducts)

  }, [category])

  useEffect(() => {

    input.name && filterProductsByName()

    input.price && filterProductsByPrice()

  }, [input])

  return (
    <div className='itemContainer'>

      <h2>Productos</h2>

      <div className='input--box'>
        <input type="text" placeholder='Busca tu producto' value={input.name} name='name' onChange={handleInput} className='input--form' />

        <input type="number" placeholder='Busca por precio' name="price" value={input.price} onChange={handleInput} className='input--form' />
      </div>


      <ItemList products={products} />

    </div>
  )
}

export default ItemListContainer