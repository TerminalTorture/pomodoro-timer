# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

# Pomodoro Timer

This is a simple Pomodoro Timer application built with React, TypeScript, and Vite. The application helps you manage your time using the Pomodoro Technique, which involves working in focused intervals followed by short breaks.

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
