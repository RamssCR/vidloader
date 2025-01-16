import { createContext, useState, useEffect } from 'react'
import {
    uploadVideo,
    uploadVideoInfo,
    showUserVideos,
    getVideoData
} from '../api/auth.requests';

// eslint-disable-next-line react-refresh/only-export-components
export const videoContext = createContext()

// eslint-disable-next-line react/prop-types
export function VideoContext({ children }) {
    const [activateModal, setActivateModal] = useState(false)
    const [loadingApp, setLoadingApp] = useState(false)
    const [videos, setVideos] = useState([])
    const [video, setVideo] = useState(null)
    const [videoCounter, setVideoCounter] = useState(0)
    const [message, setMessage] = useState('')
    const [reqErrors, setReqErrors] = useState([])

    function activate() {
        !activateModal && setActivateModal(activateModal ? false : true)
        activateModal && setLoadingApp(true)
        activateModal && setTimeout(() => {
            setActivateModal(activateModal ? false : true)
            setLoadingApp(false)
        }, 150);
    }

    // Upload video file
    const upload = async video => {
        try {
            const response = await uploadVideo(video)
            setMessage(response.data.message)
        } catch (error) {
            console.error(error);
        }
    }

    const createVideo = async data => {
        try {
            const response = await uploadVideoInfo(data)
            return response.status
        } catch (error) {
            setReqErrors(error.response.data)
        }
    }

    const showVideos = async () => {
        try {
            const response = await showUserVideos()
            setVideos(response.data.videos)
            setVideoCounter(response.data.videoCounter)
        } catch (error) {
            console.error(error.message)
        }
    }

    const getVideoInfo = async id => {
        try {
            const videoData = await getVideoData(id)
            setVideo(videoData.data)
        } catch (error) {
            console.error(error.message)
        }
    }

    const changeLoading = () => setLoadingApp(loadingApp ? false : true)
    useEffect(() => setLoadingApp(false), [reqErrors, message])
    useEffect(() => setReqErrors([]), [message])

    return (
        <videoContext.Provider value={{
            loadingApp,
            activate,
            upload,
            createVideo,
            showVideos,
            getVideoInfo,
            videos,
            video,
            videoCounter,
            message,
            changeLoading,
            activateModal,
            reqErrors
        }}>
            { children }
        </videoContext.Provider>
    )
}