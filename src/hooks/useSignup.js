/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react"
import { projectAuth } from '../firebase/config'
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [isCancelled, setisCancelled] = useState(false)

  // destructuring the dispatch
  const { dispatch } = useAuthContext()

  const signup = async (email, password, displayName) => {

    try {
      // signup user
      const res = await projectAuth.createUserWithEmailAndPassword(email, password)

      if (!res) {
        throw new Error('Coud not complete signup')
      }

      // add displayName to user created
      await res.user.updateProfile({ displayName })

      // dispatch login action. dispacth has 2 props - type, payload
      dispatch({ type: 'LOGIN', payload: res.user})

      // update state
      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }

      setIsPending(false)
      setError(null)

    }
    catch (err) {
      console.log(err.message)
      setError(err.message)
      setIsPending(false)
    }
  }

  // return a cleanup function
  useEffect(() => {
    return () => setisCancelled(true)
  }, [])

  return { error, isPending, signup }
}

