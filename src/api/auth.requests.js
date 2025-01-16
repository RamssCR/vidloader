import axios from 'axios'

const axiosConfig = axios.create({
    baseURL: 'http://localhost:2001',
    withCredentials: true
})

export const registerRequest = async (user) => await axiosConfig.post('/register', user)
export const loginRequest = async (user) => await axiosConfig.post('/login', user)
export const validateSession = async () => await axiosConfig.get('/profile')

export const showUserVideos = async () => await axiosConfig.get('/app/videos')
export const getVideoData = async id => await axiosConfig.get(`/app/video/${id}`)
export const uploadVideo = async video => await axiosConfig.post('/app/upload', video)
export const uploadVideoInfo = async data => await axiosConfig.post('/app/newVideo', data)