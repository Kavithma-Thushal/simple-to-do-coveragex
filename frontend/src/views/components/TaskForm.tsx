import CreateTaskController from '../../controllers/CreateTaskController.ts';

export default function TaskForm() {
    const {form, handleChange, createTask} = CreateTaskController();

    return (
        <form onSubmit={createTask} className="space-y-4">
            <input
                name="title"
                required
                placeholder="Title"
                value={form.title}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
            />
            <textarea
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 h-28"
            />
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50">
                Add
            </button>
        </form>
    );
}