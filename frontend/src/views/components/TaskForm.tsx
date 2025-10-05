import {FaPlus} from 'react-icons/fa';
import CreateTaskController from '../../controllers/CreateTaskController.ts';

export default function TaskForm({getTasks}: { getTasks: () => void }) {
    const {form, handleChange, createTask} = CreateTaskController(getTasks);

    return (
        <form onSubmit={createTask} className="space-y-5">
            <input
                name="title"
                required
                placeholder="Enter task title"
                value={form.title}
                onChange={handleChange}
                className="w-full border border-gray-300 dark:border-gray-600
                           rounded-lg px-4 py-3 bg-white/80 dark:bg-gray-700/70
                           text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-300
                           focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                           shadow-sm hover:shadow-md transition-all duration-300"
            />

            <textarea
                name="description"
                placeholder="Add a short description"
                value={form.description}
                onChange={handleChange}
                className="w-full border border-gray-300 dark:border-gray-600
                           rounded-lg px-4 py-3 h-28 bg-white/80 dark:bg-gray-700/70
                           text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-300
                           focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                           shadow-sm hover:shadow-md transition-all duration-300"
            />

            <button type="submit"
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2">
                <FaPlus className="text-white"/>
                Add Task
            </button>
        </form>
    );
}