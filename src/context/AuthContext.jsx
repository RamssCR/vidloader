import { createContext, useEffect, useState } from 'react'
import Cookie from 'js-cookie'
import { 
    loginRequest,
    registerRequest,
    validateSession,
} from '../api/auth.requests'

// eslint-disable-next-line react-refresh/only-export-components
export const authContext = createContext()

// eslint-disable-next-line react/prop-types
export function AuthContext({ children }) {
    const [loading, setLoading] = useState(false)
    const [loadingContent, setLoadingContent] = useState(true)
    const [user, setUser] = useState(null)
    const [reqErrors, setReqErrors] = useState([])
    const [isAuth, setIsAuth] = useState(false)


    // Register an user
    const signUp = async data => {
        setLoading(true)
        try {
            const register = await registerRequest(data)
            setUser(register.data)
            setIsAuth(true)
            setReqErrors([])
        } catch (error) {
            setReqErrors(error.response.data)
        }
    }

    // Logging into user's account
    const signIn = async data => {
        setLoading(true)
        try {
            const login = await loginRequest(data)
            setUser(login.data)
            setIsAuth(true)
        } catch (error) {
            setReqErrors(error.response.data)
        }
    }

    // Signing out
    const signOut = () => {
        Cookie.remove('token')
        setIsAuth(false)
        setUser(null)
    }

    // Validate user's session
    useEffect(() => {
        const { token } = Cookie.get()

        if (!token) {
            setIsAuth(false)
            setUser(null)
            setLoadingContent(false)
            return
        }

        const checkSession = async () => {
            try {
                const response = await validateSession()
                if (!response.data) setIsAuth(false)

                setIsAuth(true)
                setUser(response.data)
                setLoadingContent(false)
            } catch (error) {
                setIsAuth(false)
                setUser(null)
            }
        }

        checkSession()
    }, [])

    const changeLoading = () => setLoading(loading ? false : true)

    useEffect(() => setLoading(false), [user, reqErrors])
    useEffect(() => setReqErrors([]), [isAuth])

    return (
        <authContext.Provider value={{
            loading,
            loadingContent,
            user,
            reqErrors,
            signUp,
            isAuth,
            signIn,
            signOut,
            changeLoading,
        }}>
            {children}
        </authContext.Provider>
    )
}