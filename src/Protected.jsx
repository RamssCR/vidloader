import { Navigate, Outlet } from 'react-router-dom'
import { useContext } from 'react'
import { authContext } from './context/AuthContext'

function Protected() {
    const { isAuth, loadingContent } = useContext(authContext)
    if (!isAuth && !loadingContent) return <Navigate to='/login' replace />

    return <Outlet />
}

export default Protected