// Preload script for Electron
const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
  'electron', 
  {
    sendNotification: (title, body) => {
      ipcRenderer.send('notify', { title, body });
    },
    // Add any other methods you want to expose to the renderer process
    isElectron: true,
  }
);