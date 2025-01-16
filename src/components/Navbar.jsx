import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { videoContext } from '../context/index'

function Navbar() {
    const {activate, loadingApp} = useContext(videoContext)

    return (
        <section className="in-app__modal">
            <div className={`in-app__navbar-container ${loadingApp ? 'slideOut' : ''}`}>
                <span className="quit" onClick={() => activate()}>X</span>
                <nav className="in-app__navbar">
                    <li><Link to='/app' onClick={() => activate()}>Dashboard</Link></li>
                    <li><Link to='/app/upload' onClick={() => activate()}>Upload Video</Link></li>
                    <li><Link to='/app/browse' onClick={() => activate()}>Browse Videos</Link></li>
                    <li><Link to='/app/profile' onClick={() => activate()}>Profile</Link></li>
                </nav>
            </div>
        </section>
    )
}

export default Navbar