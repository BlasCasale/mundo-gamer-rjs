import React, { useContext, useState } from 'react'
import './CardUser.css'
import { LoginContext } from '../../context/loginContext'

const CardUser = () => {
    const { loged } = useContext(LoginContext)

    const [shown, setShown] = useState(false)

    const switchShown = () => setShown(!shown)

    return (
        <div className='box--cardUser'>
            <div className='box--input'>
                <label className='label--user' htmlFor="name">Nombre de usuario:</label>
                <input className='input--user' type="text" name='name' readOnly value={loged.name} />
            </div>

            <div className='box--input'>
                <label className='label--user' htmlFor="dni">DNI:</label>
                <input className='input--user' type="text" name='dni' readOnly value={loged.dni} />
            </div>

            <div className="box--input">
                <label htmlFor="adress" className='label--user'>Dirección:</label>
                <input className='input--user' type="text" name='adress' readOnly value={loged.adress} />
            </div>

            <div className='box--input'>
                <label htmlFor="email" className="label--user">Mail:</label>
                <input type="email" name='email' readOnly value={loged.email} className="input--user" />
            </div>

            <div className='box--input'>
                <label className='label--user' htmlFor="pass">Contraseña:</label>
                <input className='input--user' type={shown ? 'text' : 'password'} name='pass' readOnly value={loged.pass} />
                <button onClick={switchShown} className='btn--user'>{shown ? 'Ocultar' : 'Mostrar'}</button>
            </div>


        </div>
    )
}

export default CardUser