import React from 'react'
import { useState } from 'react'
import { useLogin } from '../../hooks/useLogin';

// styles
import styles from './Login.module.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { login, error, isPending } = useLogin()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
  }

  return (
    <form onSubmit={handleSubmit} className={styles['login-form']}>
      <h2 className='title'>Login</h2>
      <p>&nbsp;</p>
      <label>
        <span>email:</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        <span>password:</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <p>&nbsp;</p>
      { !isPending && <button className="btn">Login</button> }
      { isPending && <button className="btn" disabled>Loading...</button> }
      { error && <p className='error'>{error}</p> }
    </form>
  )
}
