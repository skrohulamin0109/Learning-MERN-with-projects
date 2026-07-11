require('dotenv').config(); 
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      throw new Error("MONGODB_URI is not defined in the environment variables.");
    }

   
    const formattedUri = uri
      .replace('<db_username>', process.env.MONGODB_ADMIN || '')
      .replace('<db_password>', process.env.MONGODB_PASSWORD || '');

    const conn = await mongoose.connect(formattedUri);
    
    console.log(`Database connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Database Connection Error: ${err.message}`);
    process.exit(1); 
  }
};

module.exports = {connectDB}