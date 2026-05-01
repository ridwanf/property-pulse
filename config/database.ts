import mongoose from 'mongoose';
const MONGO_URI = process.env.MONGO_URI || "";

if (!MONGO_URI.length) {
  throw new Error("Please define the MONGO_URI environment variable (.env.local)");
}

let connected = false

const connectDB = async () => {
  mongoose.set('strictQuery', true)

  // if the database is already connected, return the existing connection
  if (connected) {
    return mongoose.connection
  }

  try {
    await mongoose.connect(MONGO_URI)
    connected = true
    console.log('Connected to MongoDB')

  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    throw new Error('Failed to connect to MongoDB')
  }
  return mongoose.connection

}

export default connectDB