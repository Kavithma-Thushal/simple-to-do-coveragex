import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import GetTasksController from '../../controllers/GetTasksController';
import {useState, useEffect} from 'react';
import {FaSun, FaMoon} from 'react-icons/fa';

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
            className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
            <div className="absolute top-4 sm:top-6 right-4 sm:right-6">
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="px-3 sm:px-4 py-2 m-2 text-sm rounded-md bg-gray-200 dark:bg-gray-700 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600">
                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                    {darkMode ? <FaSun className="inline-block ml-2"/> : <FaMoon className="inline-block ml-2"/>}
                </button>
            </div>

            <div
                className="w-full max-w-6xl bg-white dark:bg-gray-800 dark:text-gray-100 rounded-lg shadow-md p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 transition-colors duration-300">
                <div>
                    <h2 className="text-xl font-semibold mb-4">Add a Task</h2>
                    <TaskForm getTasks={getTasks}/>
                </div>
                <div
                    className="border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-700 pt-6 md:pt-0 md:pl-8">
                    <h2 className="text-xl font-semibold mb-4">Recent Tasks</h2>
                    <TaskList tasks={tasks} getTasks={getTasks}/>
                </div>
            </div>
        </div>
    );
}