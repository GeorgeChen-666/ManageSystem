const os = require('os');
const iconv = require('iconv-lite');
const child_process = require('child_process');
const EventEmitter = require('events');

class BaseProcess extends EventEmitter {
  constructor(config) {
    super();
    this.config = config;
  }

  run() {
    const defaultEncoding = os.platform() === 'win32' ? 'GBK' : 'UTF-8';
    const { cmd, param, cwd, encoding = defaultEncoding } = this.config;
    //this.kill(true);
    this.process = child_process.spawn(cmd, param, {
      cwd
      //stdio: 'pipe',
      //stdio: [process.stdin, process.stdout],
    });
    const onData = (data) => this.emit('onData', iconv.decode(data, encoding));
    this.process.stdout.on('data', onData);
    this.process.stderr.on('data', onData);
    this.process.on('message', onData);
    this.process.on('warning', onData);
    this.process.on('error', (err) => {
      this.emit('onError', err);
    });
    this.process.on('exit', (code) => {
      this.emit('onExit', code);
    });
    this.emit('onRun');
  }

  isProcessRun() {
    return !!this.process;
  }

  sendCommand(command) {
    this.process.stdin.write(command);
    this.process.stdin.write('\n');
  }

  killProcess(silent = false) {
    if (this.isProcessRun()) {
      if (!silent) {
        this.emit('onKill');
      }
      this.process.kill('SIGKILL');
      this.process = null;
    }
  }
}

module.exports = { BaseProcess };
