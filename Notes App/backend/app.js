const express = require('express')
const dotenv = require('dotenv').config()
const {connectDB} = require('./config/dbConfig')
const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRouter')
connectDB();


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use('/auth', authRoutes);
app.use('/auth/users', userRoutes)

app.listen(PORT, ()=>{
  console.log(`Express server listening at http://localhost:${PORT}`)
})

