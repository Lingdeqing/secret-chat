const Koa = require('koa');
const send = require('koa-send');
const app = new Koa();
const server = require('http').Server(app.callback())
const io = require('socket.io')(server)
const path = require('path');


app.use(async ctx => {
    await send(ctx, 'index.html', {
        root: path.resolve(__dirname, '../client')
    });
});

io.on('connection', socket => {
    console.log('初始化成功！下面可以用socket绑定事件和触发事件了');
    socket.on('send', data => {
         console.log('客户端发送的内容：', data);
         socket.emit('getMsg', '我是返回的消息... ...');
    })

    setTimeout( () => {
        socket.emit('getMsg', '我是初始化3s后的返回消息... ...') 
    }, 3000)
})

server.listen(3000);