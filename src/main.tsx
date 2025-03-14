import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Electron setup
// Using dynamic import for Electron to allow the app to work in browser during development
const setupElectron = async () => {
  try {
    // This will only work in Electron environment
    const electron = await import('electron');
    const { app, BrowserWindow, Notification } = electron;
    
    // Check if we're running in Electron
    if (!app) return;

    let mainWindow: Electron.BrowserWindow | null = null;
    
    // Create the browser window
    const createWindow = () => {
      mainWindow = new BrowserWindow({
        width: 500,
        height: 650,
        minWidth: 400, 
        minHeight: 500,
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
        },
        title: "Pomodoro Timer",
        icon: "public/vite.svg",
      });

      // Load the app - using VITE_DEV_SERVER_URL in development (set by Vite)
      const url = process.env.VITE_DEV_SERVER_URL || 'file://' + __dirname + '/../dist/index.html';
      mainWindow.loadURL(url);

      // Enable notifications
      if (Notification.isSupported()) {
        app.setAppUserModelId("com.pomodoro.app");
      }

      // Open DevTools in development (optional)
      if (process.env.NODE_ENV === 'development') {
        mainWindow.webContents.openDevTools();
      }

      mainWindow.on('closed', () => {
        mainWindow = null;
      });
    };

    // Create window when Electron is ready
    app.whenReady().then(createWindow);

    // Quit when all windows are closed
    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });

    app.on('activate', () => {
      if (mainWindow === null) {
        createWindow();
      }
    });
  } catch (e) {
    console.log('Not running in Electron environment');
  }
};

// Call setupElectron in a way that works in both browser and Electron
setupElectron().catch(console.error);

