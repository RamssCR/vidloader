import { Router } from 'express'
import { validateToken, validateVideoData } from '../middlewares/index.js'
import { upload } from '../libs/index.js'
import { 
    uploadVideo, 
    newVideo, 
    showUserVideos,
    streamVideo,
    getVideo
} from '../controllers/index.js'

export const videoRouter = Router()

videoRouter.get('/videos', validateToken, showUserVideos)
videoRouter.get('/watch/:id', validateToken, streamVideo)
videoRouter.get('/video/:id', validateToken, getVideo)
videoRouter.post('/newVideo', validateToken, validateVideoData, newVideo)
videoRouter.post('/upload', validateToken, upload.single('video'), uploadVideo)