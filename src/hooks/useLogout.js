/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { projectAuth } from '../firebase/config'
import { useAuthContext } from './useAuthContext';


export const useLogout = () => {
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [isCancelled, setisCancelled] = useState(false)

  // destructuring the dispatch
  const { dispatch } = useAuthContext()

  const logout = async () => {
    setError(null)
    setIsPending(true)

    // sign out
    try {
      await projectAuth.signOut()

      // dispatch logout action
      dispatch({ type: "LOGOUT"})

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

  return { logout, error, isPending }

}