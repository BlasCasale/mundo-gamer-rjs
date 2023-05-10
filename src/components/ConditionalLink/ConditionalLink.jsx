import React from 'react'
import { NavLink } from 'react-router-dom'

const ConditionalLink = () => {
  return (
    <>
      <li>
        <NavLink to={"/register"}>Registrarse</NavLink>
      </li>

      <li>
        <NavLink to={"/login"}>Inicia sesión</NavLink>
      </li>
    </>
  )
}

export default ConditionalLink