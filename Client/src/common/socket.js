import io from 'socket.io-client';

const socket = io('/test?token=asdasdsadas');
socket.emit('msg', 'helloooooooo');
