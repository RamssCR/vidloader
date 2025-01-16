import timeFormat from 'hh-mm-ss'
import { statSync, createReadStream } from 'node:fs'
import { Video } from '../models/index.js'
import { extractFrame } from '../utils/thumbnailGenerator.js'
import { formatTime } from '../utils/formatTime.js'

export async function newVideo(req, res) {
    const { id } = req.user
    const { title, category, description, videoName, duration } = req.body

    const thumbnail = videoName.replace(/.mov|.mpg|.mpeg|.mp4|.wmv|.avi/gi, '.jpg')

    try {
        const uploadVideo = new Video({
            title,
            category,
            description,
            videoName,
            thumbnail,
            uploadedAt: new Date(),
            duration: timeFormat.fromS(duration),
            user: id
        })

        const savedVideo = uploadVideo.save()
        if (!savedVideo) return res.status(400).json(['An error occured while saving your video'])
        return res.sendStatus(200)
    } catch (error) {
        res.status(500).json({ message: error.response.data })
    }
}

export async function uploadVideo(req, res) {
    const videoPath = req.file.path
    const imageName = req.file.filename.replace(/ /g, '_').replace(/.mov|.mpg|.mpeg|.mp4|.wmv|.avi/gi, '.jpg')

    extractFrame({ videoPath, timeInSeconds: 1,  imageName}, (error, output) => {
        if (error) return res.status(500).json({ message: 'An error occured while extracting screenshot' })
        res.json({ 
            message: 'Video uploaded successfully',
            thumbnail: output
        })
    })
}

export async function showUserVideos(req, res) {
    const { id } = req.user
    try {
        const videos = await Video.find({user: id})
        const videoCounter = await Video.countDocuments()
        const modifiedVideos = videos.map(video => {
            const formattedDate = formatTime(video._doc.uploadedAt)
            return {
                ...video._doc,
                thumbnail: `${req.protocol}://127.0.0.1:2001/app/videos/thumbnails/${encodeURIComponent(video._doc.thumbnail)}`,
                uploadedAt: formattedDate
            }
        })

        return res.json({
            videos: modifiedVideos,
            videoCounter
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export async function streamVideo(req, res) {
    const { id } = req.params

    try {
        const video = await Video.findOne({ _id: id })
        if (!video) return res.status(400).json({ message: 'Invalid video. Try again, later' })

        const path = `src/uploads/${video.videoName}`
        const stat = statSync(path)
        const fileSize = stat.size
        const range = req.headers.range

        if (range) {
            const parts = range.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
            const chunkSize = (end - start) + 1;

            const file = createReadStream(path, { start, end });
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunkSize,
                'Content-Type': 'video/mp4',
            };

            file.pipe(res);
            res.writeHead(206, head);
        } else {
            const head = {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4',
            };
            createReadStream(path).pipe(res);
            res.writeHead(200, head);
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export async function getVideo(req, res) {
    const { id } = req.params
    
    try {
        const video = await Video.findOne({ _id: id })
        if (!video) return res.status(400).json({ message: 'Invalid video. Try again, later' })
        
        const formattedDate = formatTime(video._doc.uploadedAt)
        const arrangedVideo = {
            ...video._doc,
            videoName: `${req.protocol}://127.0.0.1:2001/app/videos/${encodeURIComponent(video._doc.videoName)}`,
            uploadedAt: formattedDate
        }
        return res.json(arrangedVideo)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}