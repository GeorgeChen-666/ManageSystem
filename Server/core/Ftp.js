const appRoot = require('app-root-path');
const fs = require('fs');
const path = require('path');
const FtpSvr = require('ftp-srv');
const ftpServer = new FtpSvr({
  url: 'ftp://127.0.0.1:8880',
  pasv_url: '192.168.1.1',
  pasv_min: 8881,
  file_format: 'ep'
});

ftpServer.on('login', function({ username, password }, resolve, reject) {
  if (username == 'anonymous') {
    resolve({ root: appRoot.path });
  } else {
    reject();
  }
});

ftpServer
  .listen()
  .then(() => {
    console.log('ready');
  });

// function buildFtpServer() {
//
// }
//
// startFtpServer();