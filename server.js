const express = require('express')
const app = express()
const http = require('http').createServer(app)

const PORT = process.env.PORT || 8000

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

app.use(express.static(__dirname ))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// Socket 
const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log('Connected...')

    // for notification of  joined message
    socket.on('new-joined',NAME=>
    {
     users[socket.id]=NAME;
     socket.broadcast.emit('user-joined',NAME)

    });
    socket.on('send',joined=>
    {
        socket.broadcast.emit('recieve',{joined:joined,NAME:users[socket.id]})
    })



    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

})









/*const express = require('express')
const app = express()


const http = require('http').createServer(app)

const PORT = process.env.PORT || 8000

http.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
})

// Serve static files from the 'public' directory

app.use(express.static(__dirname ))

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html')
}
)

const users = {};

// setup of socket
const io = require('socket.io')(http)
io.on('connection', (socket) => {
    console.log('COnected......');
  /*  socket.on('new-joined',NAME=>
    {
     users[socket.id]=NAME;
     socket.broadcast.emit('user-joined',NAME)

    });
    socket.on('send',joined=>
    {
        socket.broadcast.emit('recieve',{joined:joined,NAME:users[socket.id]})
    })
*/
    // geting message from sclient
  /*  socket.on('message',(msg)=>
    {
        socket.broadcast.emit('message',msg)

    })

    

    
})
*/