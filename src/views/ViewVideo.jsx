import { useContext, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { videoContext } from '../context/index'
import VideoDetails from '../components/VideoDetails'

function ViewVideo() {
    const { video, getVideoInfo } = useContext(videoContext)
    const [videoId, setVideoId] = useState(null)
    const navigateTo = useNavigate()

    const useQuery = () => {
        const { search } = useLocation()
        return useMemo(() => new URLSearchParams(search), [search])
    }

    let query = useQuery()
    useEffect(() => {
        if (!query.get('video')) navigateTo('/app')
        setVideoId(query.get('video'))        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoId])

    useEffect(() => {
        if (videoId) {
            (async () => await getVideoInfo(videoId))()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoId])

    if (!video) return

    return (
        <section className="app-container">
            <Link to='/app' className="back-link"><h2> &larr; Back </h2></Link>
            <section className="video-player">
                <div className="video-container">
                    <video
                        controls
                        src={video.videoName}></video>
                </div>
                <VideoDetails 
                    title={video.title} 
                    uploadedAt={video.uploadedAt} 
                    description={video.description} 
                    category={video.category} 
                />
            </section>
        </section>
    )
}

export default ViewVideo