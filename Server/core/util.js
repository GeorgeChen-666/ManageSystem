const getSystemCodeing = () => {
  let auto_console_coding;
  if (os.platform() == 'win32')
    auto_console_coding = 'GBK';
  else
    auto_console_coding = 'UTF-8';
  return auto_console_coding;
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
  getSystemCodeing,
  sleep
};