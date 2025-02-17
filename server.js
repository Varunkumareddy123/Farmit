import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Health Check Route (Optional)
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Routers
app.use('/userData', userRoutes);

const PORT = process.env.PORT || 6000;

// Start server only if DB connection is successful
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(` Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    });