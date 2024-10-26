const jwt = require('jsonwebtoken')
const Register = require('../../model/userModel/Register')
const Image = require('../../model/imageModel/Image')

const UploadImage = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(404).json({ message: 'no file choosen ' })
        }

        const token = req.cookies.token;
        const decodedToken = jwt.verify(token, process.env.secretKey);
        const userName = decodedToken.userName;
        const user = await Register.findOne({ userName: userName })

        const image = new Image({
            username: user.name,
            fileName: req.file.filename,
            pathUrl: `/images/${req.file.filename}`
        })
        await image.save();



        res.status(200).json({ message: `your image is uploaded `, image })
    } catch (error) {
        const errorMessage = error.message;
        res.status(500).json(errorMessage)
        console.error(errorMessage);
    }
}


module.exports = UploadImage;