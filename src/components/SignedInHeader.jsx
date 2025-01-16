import { Link } from 'react-router-dom'
import bars from '../assets/bars-solid.svg'
import Navbar from './Navbar'
import { useContext } from 'react'
import { 
    authContext,
    videoContext
} from '../context/index'

function SignedInHeader() {
    const { signOut } = useContext(authContext)
    const { activate, activateModal } = useContext(videoContext)

    return (
        <article className="loggedIn-container">
            <Link to='/login' className="btn-logout" onClick={() => signOut()}>Logout</Link>
            <img src={bars} alt="navigation bar" onClick={() => activate()} />
            {activateModal && <Navbar />}
        </article>
    )
}

export default SignedInHeader