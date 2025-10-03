import CreateTaskController from '../../controllers/CreateTaskController.ts';

export default function TaskForm() {
    const {form, handleChange, createTask} = CreateTaskController();

    return (
        <form onSubmit={createTask} className="space-y-4">
            <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Title"
                className="w-full border rounded px-3 py-2"
                required
            />
            <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
                className="w-full border rounded px-3 py-2 h-28"
            />
            <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50">
                Add
            </button>
        </form>
    );
}