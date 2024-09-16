const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const bodyParser = require('body-parser');

// Set up Express
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/fileSearch', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define file schema and model
const fileSchema = new mongoose.Schema({
    filename: String,
    content: String
});
const File = mongoose.model('File', fileSchema);

// Configure multer for file upload
const upload = multer({ storage: multer.memoryStorage() });

// POST /file/:filename
app.post('/file/:filename', upload.single('file'), async (req, res) => {
    try {
        const filename = req.params.filename;
        const content = req.file.buffer.toString('utf8');

        // Save file content to MongoDB
        const file = new File({ filename, content });
        await file.save();

        res.status(200).json({ message: 'File uploaded and saved successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error saving file' });
    }
});

// GET /file/:filename/search/:phrase
app.get('/file/:filename/search/:phrase', async (req, res) => {
    try {
        const filename = req.params.filename;
        const phrase = req.params.phrase;

        // Find file in MongoDB
        const file = await File.findOne({ filename });
        if (!file) {
            return res.status(404).json({ error: 'File not found' });
        }

        const lines = file.content.split('\n');
        const matches = [];

        // Search for the phrase in file content
        lines.forEach((line, index) => {
            let startIndex = line.indexOf(phrase);
            while (startIndex !== -1) {
                matches.push({ line: index + 1, character: startIndex + 1 });
                startIndex = line.indexOf(phrase, startIndex + phrase.length);
            }
        });

        res.status(200).json({
            filename: file.filename,
            matches
        });
    } catch (err) {
        res.status(500).json({ error: 'Error searching for phrase' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
