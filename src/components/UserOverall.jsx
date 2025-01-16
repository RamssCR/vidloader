import { useContext, useState } from 'react'
import userImg from '../assets/user-solid.svg'
import { Link } from 'react-router-dom'
import { authContext } from '../context/AuthContext'

function UserOverall() {
    const { user } = useContext(authContext)
    const [onElement, setOnElement] = useState(false)

    if (!user) return

    return (
        <section className="dashboard__user-data">
            <article className="user-data__user-profile">
                <img src={userImg} alt={user.username} />
                <span className="username">{user.username}</span>
            </article>
            <Link 
                to='/app/upload' 
                className="create-new"
                onMouseOver={() => setOnElement(true)}
                onMouseOut={() => setOnElement(false)}
            >
                <span className="more">+</span>
            </Link>
            <span className={`newVideo ${onElement ? 'moved' : ''}`}>New Video</span>
        </section>
    )
}

export default UserOverall