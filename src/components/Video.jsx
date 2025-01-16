import { useState } from 'react'
import { Link } from 'react-router-dom'
import Options from './Options'
import ellipsis from '../assets/ellipsis-vertical-solid.svg'

/* eslint-disable react/prop-types */
function Video({ video }) {
    const [activate, setActivate] = useState(false)
    document.body.addEventListener('dblclick', () => {
        if (activate) setActivate(false)
    })

    return (
        <article className="video-card">
            <Link to={`/app/watch?video=${video._id}`}>
                <div className="thumbnail" style={{backgroundImage: video.thumbnail ? `url(${video.thumbnail})` : ''}}>
                    <span className="duration">{video.duration}</span>
                </div>
            </Link>
            <Link to={`/app/watch?video=${video._id}`}>
                <div className="video-info">
                    <span className="category">{video.category}</span>
                    <span className="video-title">{video.title}</span>
                    <span className="video-date">Uploaded on {video.uploadedAt}</span>
                    <span className="video-description">{video.description}</span>
                </div>
            </Link>
            <div className="options">
                <img src={ellipsis} alt="options" onClick={() => setActivate(activate ? false : true)} />
                {activate && <Options id={video._id} />}
            </div>
        </article>
    )
}

export default Video;