import mongoose from 'mongoose';
import app from './app';
import dotenv from 'dotenv';
dotenv.config();

async function startServer(): Promise<void> {
  try {
    await mongoose.connect(process.env.MONGO_URI||'');
    console.log('MongoDB connected');

    const server = app.listen(process.env.PORT, () =>
      console.log(`Server running at http://localhost:${process.env.PORT}`)
    );

    const shutdown = (): void => {
      console.log('Shutting down server...');
      server.close(() => {
        mongoose.connection.close();
        console.log('MongoDB connection closed');
        process.exit(0);
      });
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
