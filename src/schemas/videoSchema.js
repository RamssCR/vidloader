import zod from 'zod'

const videoSchema = zod.object({
    title: zod.string().min(2, { message: 'Title must contain at least 2 characters' }).max(100, { message: 'Title must contain less than 100 characters' }),
    category: zod.enum(['Entertainment', 'Food', 'Music', 'Education', 'Gaming', 'Trending']),
    description: zod.string().max(1000, { message: 'Title must contain less than 1000 characters' }).default('No description'),
    videoName: zod.string().min(4, { message: 'Video title length must contain 5 characters or more' }),
    duration: zod.number({ required_error: 'Duration required' }).int().positive()
})

export function validateVideo(object) {
    return videoSchema.safeParse(object)
}