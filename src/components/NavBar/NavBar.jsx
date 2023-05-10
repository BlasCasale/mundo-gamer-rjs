import React, { useContext } from 'react'
import './NavBar.css'
import '../CardWidget/CardWidget.jsx'
import CardWidget from '../CardWidget/CardWidget.jsx'
import { Link, NavLink } from 'react-router-dom'
import { LoginContext } from '../../context/loginContext'
import ConditionalLink from '../ConditionalLink/ConditionalLink'
import UserAvatarNav from '../UserAvatarNav/UserAvatarNav'
import { CartContext } from '../../context/cartContext'


const NavBar = () => {
  const { loged } = useContext(LoginContext)

  const { cart } = useContext(CartContext)
  return (
    <header>

      <Link to={"/"}>
        <h1>Mundo Gamer</h1>
      </Link>

      <nav>

        <ul>
          <li>
            <NavLink to={"/"}>Inicio</NavLink>
          </li>

          <li>
            <NavLink to={"/category/procesador"}>Procesador</NavLink>
          </li>

          <li>
            <NavLink to={"/category/mother"}>Mother</NavLink>
          </li>

          <li>
            <NavLink to={"/category/gpu"}>GPU</NavLink>
          </li>

          <li>
            <NavLink to={"category/ram"}>RAM</NavLink>
          </li>

          <li>
            <NavLink to={"/category/discos"}>Discos</NavLink>
          </li>

          {
            loged ? (<UserAvatarNav />) : (<ConditionalLink />)
          }

        </ul>

      </nav>

      {cart.length === 0 ? <></> : <CardWidget />}

    </header>
  )
}

export default NavBar