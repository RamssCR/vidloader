import ffmpeg from 'fluent-ffmpeg'
import ffmpegPath from 'ffmpeg-static'
import path from 'node:path'

ffmpeg.setFfmpegPath(ffmpegPath)

export function extractFrame({videoPath, timeInSeconds = 1, imageName}, callback) {
    const outputPath = path.join('src/uploads/thumbnails', imageName)

    ffmpeg(videoPath)
        .screenshot({
            timestamps: [timeInSeconds],
            filename: imageName,
            folder: 'src/uploads/thumbnails',
            size: '1280x720'
        })
        .on('end', () => callback(null, outputPath))
        .on('error', (error) => callback(error, null))
}