import { 
    register, 
    login, 
    logout,
    getUser
} from './authController.js'
import { 
    uploadVideo,
    newVideo,
    showUserVideos,
    streamVideo,
    getVideo
} from './videoController.js';

export {
    register,
    login,
    logout,
    getUser,
    uploadVideo,
    newVideo,
    showUserVideos,
    streamVideo,
    getVideo
}