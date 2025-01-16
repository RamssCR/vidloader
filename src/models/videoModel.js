import { Schema, model } from 'mongoose'

const videoSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    videoName: {
        type: String,
        required: true,
        trim: true
    },
    duration: {
        type: String,
        required: true,
        trim: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    uploadedAt: {
        type: Date,
        required: true
    },
    user: {
        type: String,
        required: true
    }
})

export default model('videos', videoSchema)