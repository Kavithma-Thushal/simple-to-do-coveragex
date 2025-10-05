import {useState, useEffect} from 'react';
import {FaSun, FaMoon} from 'react-icons/fa';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import GetTasksController from '../../controllers/GetTasksController';

export default function Home() {
    const {tasks, getTasks} = GetTasksController();
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('theme');
        if (saved === 'dark') setDarkMode(true);
    }, []);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6v bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 transition-all duration-500">

            <div className="absolute top-4 sm:top-6 right-4 sm:right-6">
                <button onClick={() => setDarkMode(!darkMode)}
                        className="px-4 py-2 rounded-full bg-white/70 dark:bg-gray-700/70 text-gray-800 dark:text-gray-100 shadow-md backdrop-blur-sm hover:scale-105 hover:shadow-lg transition-all duration-300">
                    {darkMode ? (
                        <><FaSun className="inline-block mr-2 text-yellow-400"/> Light</>
                    ) : (
                        <><FaMoon className="inline-block mr-2 text-blue-500"/> Dark</>
                    )}
                </button>
            </div>

            <div
                className="w-full max-w-6xl bg-white/70 dark:bg-gray-800/60 backdrop-blur-md rounded-2xl shadow-2xl p-8 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 border border-gray-200/50 dark:border-gray-700/50 transition-all duration-500">
                <div>
                    <h2 className="text-3xl font-semibold mb-8 text-gray-800 dark:text-gray-100">✨ Add a Task</h2>
                    <TaskForm getTasks={getTasks}/>
                </div>
                <div
                    className="border-t md:border-t-0 md:border-l-4 border-gray-300 dark:border-gray-600 pt-6 md:pt-0 md:pl-8">
                    <h2 className="text-3xl font-semibold mb-8 text-gray-800 dark:text-gray-100">🕒 Recent Tasks</h2>
                    <TaskList tasks={tasks} getTasks={getTasks}/>
                </div>
            </div>
        </div>
    );
}