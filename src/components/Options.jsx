import { Link } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
function Options({ id }) {
    return (
        <nav className="options-navbar">
            <Link to={`/app/video/edit?video=${id}`}>Edit Video</Link>
            <button className="options-btn">Delete Video</button>
        </nav>
    )
}

export default Options