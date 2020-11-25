const { getDataFromToken } = require('./jwt');

const socketHandlers = [];
const registerSocket = (path, callback) => {
  socketHandlers.push(() => {
    const testNS = global.sio.of(path);
    // testNS.use((socket, next) => {
    //   // ensure the user has sufficient rights
    //
    //   next();
    // });
    testNS.on('connection', socket => {
      const token = socket.handshake.query.token;

      if (!token) {
        socket.emit('error', 'token error');
      } else {
        try {
          const { user } = getDataFromToken(token);
          socket.currentUser = user;
          callback(socket);
        } catch (e) {
          socket.emit('error', 'token expired');
        }
        // socket.on('msg', function(obj) {
        //   console.log('the websokcet message is:' + obj);
        //   //延迟3s返回信息给客户端
        //   setTimeout(function() {
        //
        //     socket.emit('msg', obj);
        //   }, 3000);
        // });
      }
    });

  });
};

module.exports = {
  registerSocket,
  socketHandlers
};
