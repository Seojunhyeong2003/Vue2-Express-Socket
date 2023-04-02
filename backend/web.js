// const express = require('express');
// const http = require('http');
// const socketIO = require('socket.io');
// const path = require('path');

// const app = express();
// const server = http.createServer(app);
// const io = socketIO(server);



var app = require('express')();
var server = require('http').createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"],
        transports: ['websocket', 'polling'],
        credentials: true
    },
    allowEIO3: true
});

app.get('/', function (req, res) {
    res.sendFile('Hellow Chating App Server');
});
//connection event handler
io.on('connection', function (socket) {
    console.log('Connect from Client: ' + socket);

    socket.on('chat', function (data) {
        console.log('message from Client: ' + data.message);

        var rtnMessage = {
            message: data.message
        };

        // 클라이언트에게 메시지를 전송한다
        socket.broadcast.emit('chat', rtnMessage);
    });
})



// app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname, 'views/index.html'));
// });

// io.on('connection', function(socket){
//     socket.emit('fromServer', '존나 반갑습니다.')

//     socket.on('event', function(data){
//         console.log(data)
//     })

//     socket.emit('usercount', io.engine.clientsCount);

//     socket.on('message', (msg) => {
//         //msg에는 클라이언트에서 전송한 매개변수가 들어온다. 이러한 매개변수의 수에는 제한이 없다.
//         console.log('메시지 받았다 : ' + msg);

//         // io.emit으로 연결된 모든 소켓들에 신호를 보낼 수 있다.
//         io.emit('message', msg);
//     });


//     socket.on('disconnect', function(){
//         console.log('누가 나간듯')
//     })
// });

server.listen(8001, function () {
    console.log('리스닝 8001번 포트~')
});