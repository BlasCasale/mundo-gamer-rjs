import React from 'react'
import './ItemListContainer.css'
import { useEffect, useState } from 'react'
import ItemList from '../ItemList/ItemList'
import { useParams } from 'react-router-dom'
import { collection, getDocs, where, query } from 'firebase/firestore'
import { db } from '../../service/firebase/config'

const ItemListContainer = () => {

  const [products, setProduct] = useState([])

  const { category } = useParams()

  useEffect(() => {
    const myProducts = category ? query(collection(db, "products"), where("category", "==", category)) : collection(db, "products")

    getDocs(myProducts)
      .then(res => {
        const newProduct = res.docs.map(doc => {
          const data = doc.data()
          return { id: doc.id, ...data }
        })
        setProduct(newProduct)
      })
      .catch(error => console.log(error))
  }, [category])


  return (
    <div className='itemContainer'>

      <h2>Productos</h2>

      <ItemList products={products} />

    </div>
  )
}

export default ItemListContainer