import React from 'react'
import { Link } from 'react-router-dom'
import './LinkDetail.css'

const LinkDetail = () => {
  return (
    <>
      <Link className='link--detail' to={"/"}>Seguir comprando</Link>
      <Link className='link--detail' to={"/cart"}>Terminar compra</Link>
    </>
  )
}

export default LinkDetail