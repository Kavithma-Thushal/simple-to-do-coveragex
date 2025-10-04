import CreateTaskController from '../../controllers/CreateTaskController.ts';

export default function TaskForm({getTasks}: { getTasks: () => void }) {
    const {form, handleChange, createTask} = CreateTaskController(getTasks);

    return (
        <form onSubmit={createTask} className="space-y-4">
            <input
                name="title"
                required
                placeholder="Title"
                value={form.title}
                onChange={handleChange}
                className="w-full border border-gray-300 dark:border-gray-600
                           rounded px-3 py-2 bg-white dark:bg-gray-700
                           text-gray-900 dark:text-gray-100
                           placeholder-gray-400 dark:placeholder-gray-300
                           focus:outline-none focus:ring-2
                           focus:ring-blue-500 dark:focus:ring-blue-400"/>

            <textarea
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                className="w-full border border-gray-300 dark:border-gray-600
                           rounded px-3 py-2 h-28 bg-white dark:bg-gray-700
                           text-gray-900 dark:text-gray-100
                           placeholder-gray-400 dark:placeholder-gray-300
                           focus:outline-none focus:ring-2
                           focus:ring-blue-500 dark:focus:ring-blue-400"/>

            <button type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50">
                Add
            </button>
        </form>
    );
}