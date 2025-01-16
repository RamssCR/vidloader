import multer from 'multer'

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'src/uploads'),
    filename: (req, file, cb) => cb(null, file.originalname.replace(/ /g, '_'))
})

export const upload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 60 }
})