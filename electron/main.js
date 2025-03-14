// Electron main process
const { app, BrowserWindow, ipcMain, Notification } = require('electron');
const path = require('path');
const url = require('url');

// Keep a global reference of the window object
let mainWindow;

function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 500,
    height: 650,
    minWidth: 400,
    minHeight: 500,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
    title: "Pomodoro Timer",
    icon: path.join(__dirname, '../public/vite.svg'),
  });

  // Check if we're in development or production
  const isDev = process.env.NODE_ENV === 'development';
  
  // In development, load from the Vite dev server
  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    // In production, load the built index.html file
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, '../dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  // Enable notifications in Windows
  if (process.platform === 'win32') {
    app.setAppUserModelId("com.pomodoro.app");
  }

  // Handle window being closed
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

// Create window when Electron is ready
app.whenReady().then(() => {
  createWindow();
});

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Handle IPC messages from the renderer process
ipcMain.on('notify', (event, { title, body }) => {
  new Notification({ title, body }).show();
});