import React, { useContext, useEffect } from 'react'
import { useState, useRef } from 'react'
import './Form.css'
import { LoginContext } from '../../context/loginContext'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../service/firebase/config'

const Form = () => {
  const { loginUser } = useContext(LoginContext)

  const [color, setColor] = useState("")

  const style = color

  const pForm = useRef(null)

  const [user, setUser] = useState([])

  const [input, setInput] = useState({ dni: "", pass: "" })

  useEffect(() => {
    const myUsers = collection(db, "users")

    getDocs(myUsers)
      .then((user) => {
        const newUser = user.docs.map(client => {
          const data = client.data()
          return { ...data }
        })
        setUser(newUser)
      })
      .catch(error => console.log(error))
  })

  const checkUser = (dni, pass) => {
    setUser([...user, (dni, pass)])

    const findDni = user.find(client => client.dni === dni)
    const findPass = user.find(client => client.pass === pass)


    if (findDni && findPass) {
      loginUser(findDni)
    } else {
      pForm.current.textContent = "El DNI y la contraseña no coinciden."
      setColor("p--negative")
    }
  }

  const handleInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  const handlerSubmit = (e) => {
    e.preventDefault()

    checkUser(input.dni, input.pass)
  }

  return (
    <>

      <fieldset className='fieldset--login'>

        <form className='form' onSubmit={handlerSubmit}>

          <legend>Ingresa a tu cuenta</legend>

          <input type="number" value={input.dni} placeholder='Ingresa tu DNI' name='dni' required onChange={handleInput} className='input--form' />

          <input type="password" value={input.pass} placeholder='Ingresa tu contraseña' name='pass' required onChange={handleInput} className='input--form' />

          <button type="submit" className='form--btn'>Ingresar</button>

          <p ref={pForm} className={style}></p>

        </form>

      </fieldset>

    </>
  )
}

export default Form