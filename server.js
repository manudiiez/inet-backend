import express from "express"
import mongoose from "mongoose"
import dotenv from 'dotenv'
import cookieParser from "cookie-parser"
import cors from 'cors'
import personRoute from './routes/person.js'
import userRoute from './routes/user.js'
import areaRoute from './routes/area.js'
import fileRoute from './routes/file.js'
import alertRoute from './routes/alert.js'
import { Server as SocketServer } from 'socket.io'
import http from 'http'



// MONGODB CONFIG
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        // await mongoose.connect('mongodb://localhost:27017/misalud');
        console.log('Connected to mongoDB')
    } catch (error) {
        throw error;
    }
}
mongoose.connection.on('disconnected', () => {
    console.log('mongoDB disconnected!!')
})
mongoose.connection.on('connected', () => {
    console.log('mongoDB connected!!')
})

// SERVER
const app = express()
dotenv.config()


// MIDDLEWARES 
app.use(cors())
app.use(cookieParser())
app.use(express.json())
const server = http.createServer(app)


app.use('/api/person', personRoute);
app.use('/api/user', userRoute);
app.use('/api/area', areaRoute);
app.use('/api/file', fileRoute);
app.use('/api/alert', alertRoute);

const io = new SocketServer(server, {
    cors: {
        origin: process.env.IO_URL
    }
})

io.on('connect', (socket) => {
    console.log(socket.id, 'connected')

    socket.on('message', (data) => {
        console.log(data);
        socket.broadcast.emit('message', {
            body: data,
            from: socket.id
        })
    })
    socket.on('alert', (data) => {
        console.log(data);
        socket.broadcast.emit('alert', data)
    })
})


server.listen(process.env.PORT || 8800, () => {
    connect()
    console.log('Connected to backend!')
})