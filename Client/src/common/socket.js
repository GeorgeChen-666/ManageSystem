import io from 'socket.io-client';


function registerSocket(path, callback) {
  const token = localStorage.getItem('token');
  const socket = io(`/${path}?token=${token}`);
  callback(socket);
  // socket.on('msg', (data) => {
  //   console.log(8888, data)
  // });
  socket.on('error', (data) => {
    console.log('error', data)
  });
  return socket;
}

export {
  registerSocket
}
// const socket1 = io('/ttt?token='+token);
// socket1.emit('msg', 'hellttttttttttttt');
// socket1.on('msg', (data) => {
//   console.log(9999, data)
// });
// console.log(socket)