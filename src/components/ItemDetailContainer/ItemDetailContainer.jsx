import React from 'react'
import { useState, useEffect } from 'react'
import ItemDetail from '../ItemDetail/ItemDetail'
import './ItemDetailContainer.css'
import { useParams } from 'react-router-dom'
import { db } from '../../service/firebase/config'
import { getDoc, doc } from 'firebase/firestore'

const ItemDetailContainer = () => {

  const [product, setProduct] = useState(null)

  const { id } = useParams()

  useEffect(() => {
    const newDoc = doc(db, 'products', id)

    getDoc(newDoc)
      .then(res => {
        const data = res.data()
        const newProduct = { id: res.id, ...data }
        setProduct(newProduct)
      })
      .catch(error => console.log(error))
  }, [id])

  return (
    <div className='detailContainer'>
      <div className='container--h2'>
        <h2>Detalles del producto</h2>
      </div>
      <ItemDetail {...product} />
    </div>
  )
}

export default ItemDetailContainer