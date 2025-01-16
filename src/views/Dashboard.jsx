import { useContext, useEffect } from "react"
import UserOverall from "../components/UserOverall"
import Video from "../components/Video"
import { videoContext } from "../context/index"

function Dashboard() {
    const { videos, showVideos, videoCounter } = useContext(videoContext)

    useEffect(() => {
        (async () => await showVideos())()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <section className="app-container">
            <h1 className="in-app__title">Dashboard</h1>
            <UserOverall />
            <h2 className="in-app__subtitle">Your Videos ({videoCounter})</h2>
            <section className="videos-container">
                {videos && videos.map(video => <Video key={video._id} video={video} />)}
            </section>
        </section>
    )
}

export default Dashboard