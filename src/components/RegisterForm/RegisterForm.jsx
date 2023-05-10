import React, { useEffect } from 'react'
import { useState, useRef } from 'react'
import './RegisterForm.css'
import { addDoc, collection, getDocs } from 'firebase/firestore'
import { db } from '../../service/firebase/config'

const RegisterForm = () => {
    const [color, setColor] = useState("")

    const [user, setUser] = useState([])

    const style = color

    const pForm = useRef(null)

    const [input, setInput] = useState({ name: "", lastname: "", pass: "", passTwo: "", dni: "", cellphone: "", email: "", adress: "" })

    useEffect(() => {
        const myUsers = collection(db, "users")

        getDocs(myUsers)
            .then((user) => {
                const newUser = user.docs.map((client) => {
                    const data = client.data()
                    return { ...data }
                })
                setUser(newUser)
            })
            .catch(error => console.log(error))
    }, [])

    const compareDni = (dni) => {
        return user.find(user => user.dni === dni)
    }

    const handleInput = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (compareDni(input.dni)) {
            setColor("p--negative")
            pForm.current.textContent = "❌ Usuario ya registrado."
        } else if (input.pass.valueOf() === input.passTwo.valueOf()) {
            addDoc(collection(db, "users"), {
                name: input.name,
                lastname: input.lastname,
                dni: input.dni,
                pass: input.pass,
                passTwo: input.passTwo,
                cellphone: input.cellphone,
                email: input.email,
                adress: input.adress,
            })
            setInput({ name: "", lastname: "", dni: "", pass: "", passTwo: "", cellphone: "", email: "", adress: "" })
            setColor("p--positive")
            pForm.current.textContent = "✔ Usuario registrado exitosamente."
        } else {
            pForm.current.textContent = "❌ Las contraseñas no coinciden."
            setInput({ pass: "", passTwo: "" })
            setColor("p--negative")
        }
    }

    return (
        <div className='form--box'>

            <fieldset className='fieldset--register'>

                <form className='form' onSubmit={handleSubmit}>

                    <legend>Registra tu cuenta</legend>

                    <input type="text" className='input--form' required name='name' placeholder='Ingresa tu nombre' value={input.name} onChange={handleInput} />

                    <input type="text" className='input--form' required name='lastname' placeholder='Ingresa tu apellido' value={input.lastname} onChange={handleInput} />

                    <input type="number" className='input--form' required name='dni' placeholder='Ingresa tu DNI' value={input.dni} onChange={handleInput} />

                    <input type='password' className='input--form' required name='pass' placeholder='Ingresa tu contraseña' value={input.pass} onChange={handleInput} />

                    <input type="password" className='input--form' required name='passTwo' placeholder='Repeti tu contraseña' value={input.passTwo} onChange={handleInput} />

                    <input type="number" className='input--form' required name='cellphone' placeholder='Ingresa tu celular' value={input.cellphone} onChange={handleInput} />

                    <input type="text" className='input--form' required name='adress' placeholder='Ingresa tu dirección' value={input.adress} onChange={handleInput} />

                    <input type="email" className='input--form' required name='email' placeholder='Ingresa tu mail' value={input.email} onChange={handleInput} />

                    <button type='submit' className='form--btn'>Registrarse</button>

                    <p ref={pForm} className={style}></p>

                </form>

            </fieldset>

        </div>
    )
}

export default RegisterForm