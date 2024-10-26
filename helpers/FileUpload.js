const fs = require('fs')
const multer = require('multer')

const avatarFilePath = '/uploaded'

const Accessed = fs.existsSync(avatarFilePath)
if (!Accessed) {
    fs.mkdirSync(avatarFilePath, { recursive: true })
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, avatarFilePath)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname)
    }
})

const upload = multer({ storage: storage });

module.exports = upload;