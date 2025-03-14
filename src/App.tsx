import { useState, useEffect, useCallback } from "react";

const POMODORO_TIME = 25 * 60; // 25 minutes in seconds
const SHORT_BREAK_TIME = 5 * 60; // 5 minutes in seconds
const LONG_BREAK_TIME = 10 * 60; // 10 minutes in seconds

type TimerMode = 'pomodoro' | 'shortBreak' | 'longBreak' | 'custom';

export default function PomodoroTimer() {
    const [timeLeft, setTimeLeft] = useState(POMODORO_TIME);
    const [isRunning, setIsRunning] = useState(false);
    const [customTime, setCustomTime] = useState(15); // Default custom time in minutes
    const [mode, setMode] = useState<TimerMode>('pomodoro');
    const [darkMode, setDarkMode] = useState(false);
    const [showCustomForm, setShowCustomForm] = useState(false);
    const alarm = new Audio("./a320-tritone-chime.mp3");

    // Function to format time as MM:SS
    const formatTime = useCallback((seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs.toString().padStart(2, "0")}`;
    }, []);

    // Handle timer completion and notifications
    useEffect(() => {
        if (!isRunning) return;
        
        if (timeLeft <= 0) {
            alarm.play();
            setIsRunning(false);
            
            // Show notification if supported
            if (Notification.permission === "granted") {
                new Notification("Pomodoro Timer", {
                    body: `Your ${mode} session has ended!`,
                    icon: "/vite.svg"
                });
            } else if (Notification.permission !== "denied") {
                Notification.requestPermission();
            }
            return;
        }

        const interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
        return () => clearInterval(interval);
    }, [isRunning, timeLeft, mode, alarm]);

    // Apply dark mode to document
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    // Switch timer mode
    const switchMode = useCallback((newMode: TimerMode, customMinutes?: number) => {
        setIsRunning(false);
        setMode(newMode);
        
        switch (newMode) {
            case 'pomodoro':
                setTimeLeft(POMODORO_TIME);
                break;
            case 'shortBreak':
                setTimeLeft(SHORT_BREAK_TIME);
                break;
            case 'longBreak':
                setTimeLeft(LONG_BREAK_TIME);
                break;
            case 'custom':
                if (customMinutes) {
                    setTimeLeft(customMinutes * 60);
                    setCustomTime(customMinutes);
                    setShowCustomForm(false);
                } else {
                    setShowCustomForm(true);
                }
                break;
        }
    }, []);

    // Handle custom time submission
    const handleCustomSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        switchMode('custom', customTime);
    };

    // Pause/Resume timer
    const toggleTimer = () => {
        setIsRunning(prev => !prev);
    };

    // Reset timer to current mode's default time
    const resetTimer = () => {
        setIsRunning(false);
        switch (mode) {
            case 'pomodoro':
                setTimeLeft(POMODORO_TIME);
                break;
            case 'shortBreak':
                setTimeLeft(SHORT_BREAK_TIME);
                break;
            case 'longBreak':
                setTimeLeft(LONG_BREAK_TIME);
                break;
            case 'custom':
                setTimeLeft(customTime * 60);
                break;
        }
    };

    return (
        <div className={`flex flex-col items-center p-6 min-h-screen w-full ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
            <header className="w-full flex justify-between mb-8">
                <h1 className="text-2xl font-bold">Pomodoro Timer</h1>
                <button 
                    onClick={() => setDarkMode(prev => !prev)}
                    className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                    aria-label={darkMode ? "Light mode" : "Dark mode"}
                >
                    {darkMode ? "🌞" : "🌙"}
                </button>
            </header>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 w-full max-w-md">
                <div className="text-center mb-6">
                    <h2 className="text-5xl font-bold mb-2">{formatTime(timeLeft)}</h2>
                    <p className="text-gray-500 dark:text-gray-400 capitalize">{mode === 'custom' ? `Custom (${customTime}min)` : mode}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-6">
                    <button 
                        className={`btn ${mode === 'pomodoro' ? 'bg-red-500 text-white dark:bg-red-600' : 'btn-secondary'}`}
                        onClick={() => switchMode('pomodoro')}
                    >
                        Pomodoro
                    </button>
                    <button 
                        className={`btn ${mode === 'shortBreak' ? 'bg-green-500 text-white dark:bg-green-600' : 'btn-secondary'}`}
                        onClick={() => switchMode('shortBreak')}
                    >
                        Short Break
                    </button>
                    <button 
                        className={`btn ${mode === 'longBreak' ? 'bg-blue-500 text-white dark:bg-blue-600' : 'btn-secondary'}`}
                        onClick={() => switchMode('longBreak')}
                    >
                        Long Break
                    </button>
                    <button 
                        className={`btn ${mode === 'custom' ? 'bg-purple-500 text-white dark:bg-purple-600' : 'btn-secondary'}`}
                        onClick={() => switchMode('custom')}
                    >
                        Custom Break
                    </button>
                </div>

                {showCustomForm && (
                    <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                        <form onSubmit={handleCustomSubmit} className="flex gap-2">
                            <input
                                type="number"
                                min="0"
                                max="60"
                                value={customTime}
                                onChange={(e) => setCustomTime(Math.max(1, parseInt(e.target.value) || 1))}
                                className="flex-grow px-3 py-2 border rounded dark:bg-gray-800 dark:border-gray-600"
                                aria-label="Custom time in minutes"
                            />
                            <button 
                                type="submit" 
                                className="btn btn-primary"
                            >
                                Set
                            </button>
                        </form>
                    </div>
                )}
                
                <div className="flex justify-center gap-4">
                    <button 
                        className={`btn ${isRunning ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                        onClick={toggleTimer}
                    >
                        {isRunning ? "Pause" : "Start"}
                    </button>
                    <button 
                        className="btn btn-danger"
                        onClick={resetTimer}
                    >
                        Reset
                    </button>
                </div>
            </div>
            
            <footer className="mt-8 text-sm text-gray-500 dark:text-gray-400">
                <p>Pomodoro Timer - Focus better, work smarter</p>
            </footer>
        </div>
    );
}

