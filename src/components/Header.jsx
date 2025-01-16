import { Link } from 'react-router-dom'
import SignedInHeader from './SignedInHeader'
import { useContext } from 'react'
import { authContext } from '../context/AuthContext'

function Header() {
    const {isAuth} = useContext(authContext)

    return (
        <header className="app-header">
            <h2 className="app-header__title">VidLoader</h2>
            <nav className="app-navbar">
                {!isAuth && (
                    <>
                        <li><Link to='/login' className='btn-login'>Sign In</Link></li>
                        <li><Link to='/register' className='btn-signup'>Sign Up</Link></li>
                    </>
                )}
                {isAuth && <SignedInHeader />}
            </nav>
        </header>
    )
}

export default Header