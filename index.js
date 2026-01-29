const express = require('express')
const dotenv = require('dotenv')
const connectdb = require('./db');
const cookieParser = require('cookie-parser');
const NotesRouter = require('./routes/NotesRoutes')
const TestimonialRouter= require('./routes/TestimonialRoutes')
const cloudinary = require('cloudinary').v2;
const cors = require('cors')
const bodyParser = require('body-parser');

dotenv.config();
connectdb();

const app = express()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
}),

app.use(cors())

//Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({extended: false, limit: '50mb'}));
app.use(cookieParser());

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'Server is running', timestamp: new Date() });
});

//Routes
app.use('/api/notes', NotesRouter);
app.use('/api/testimonials', TestimonialRouter);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Server Error:', err);
    res.status(err.statusCode || 500).json({ 
        message: err.message || 'Internal server error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

//server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
})