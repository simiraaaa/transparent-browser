const { ipcRenderer } = require('electron')

global.toggleDevTools = () => {
  ipcRenderer.sendToHost('call', 'toggleDevTools');
};