/* eslint-disable react/prop-types */
function VideoDetails({ title, uploadedAt, description, category }) {
    return (
        <article className="video-info">
            <h2 className="video-title">{title}</h2>
            <span className="video-date">Uploaded on {uploadedAt}</span>
            <span className="video-description">{description}</span>
            <span className="video-category">Category: <span className="green">{category}</span></span>
        </article>
    )
}

export default VideoDetails