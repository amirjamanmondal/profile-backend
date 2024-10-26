const express = require('express');
const path = require('path');
const fs = require('fs');
const userRoute = require('./router/UserRoute');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use('/user', userRoute);
app.get('/', (req, res) => {
    res.render('index', { message: 'Hello, world!' });
});

// Serve static files (e.g., HTML, CSS, JavaScript)
app.use(express.static(path.join(__dirname, 'uploaded')));

// Serve PDF files
app.get('/pdf/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'uploaded', filename);

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.status(404).send('File not found');
        } else {
            res.setHeader('Content-Type', 'application/pdf');
            res.send(data);
        }
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
