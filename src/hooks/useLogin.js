import { useEffect, useState } from "react"
import { projectAuth } from '../firebase/config'
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [isCancelled, setisCancelled] = useState(false)

  // destructuring the dispatch
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    setError(null)
    setIsPending(true)

    // sign in
    try {
      const res = await projectAuth.signInWithEmailAndPassword(email, password)

      // dispatch logout action
      dispatch({ type: "LOGIN", payload: res.user })

      // update state
      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }

      setError(null)
      setIsPending(false)
    }
    catch(err) {
      console.log(err.message)
      setError(err.message)
      setIsPending(false)
    }
  }

  // return a cleanup function
  useEffect(() => {
    return () => setisCancelled(true)
  }, [])

  return { login, error, isPending }

}