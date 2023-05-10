import React, { useContext } from 'react'
import Form from '../Form/Form'
import { LoginContext } from '../../context/loginContext'
import CardUser from '../CardUser/CardUser'
import './LoginForm.css'

const LoginForm = () => {

  const { loged } = useContext(LoginContext)

  return (
    <div className='box--form'>
      {
        loged ? (<CardUser />) : (<Form />)
      }
    </div>
  )
}

export default LoginForm