# Pomodoro Timer

This is a simple Pomodoro Timer application built with React, TypeScript, and Vite. The application helps you manage your time using the Pomodoro Technique, which involves working in focused intervals followed by short breaks.

![image](https://github.com/user-attachments/assets/94ce4ba8-a7cf-4127-b794-07989c392006)

## Features

- Pomodoro timer (25 minutes)
- Short break timer (5 minutes)
- Long break timer (10 minutes)
- Custom timer
- Dark mode support
- Notifications when a timer ends

## Setup Instructions

Follow these steps to set up and run the Pomodoro Timer application on your local machine:

### Prerequisites

Make sure you have the following installed on your system:

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/pomodoro-timer.git
   cd pomodoro-timer
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

### Development

To start the development server, run:

```sh
npm run dev
```

This will start the Vite development server and open the application in your default web browser.

### Build

To build the application for production, run:

```sh
npm run build
```

The production-ready files will be generated in the `dist` directory.

### Electron

To run the application as an Electron app, use the following commands:

1. Start the development server and Electron:

   ```sh
   npm run electron:dev
   ```

2. Build the Electron app for production:

   ```sh
   npm run electron:build
   ```

The Windows executable will be generated in the `dist-electron/win-unpacked` directory.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
