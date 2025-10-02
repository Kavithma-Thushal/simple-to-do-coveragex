import {useState} from 'react';

interface Props {
    taskController: any;
}

export default function TaskForm({taskController}: Props) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    const clear = () => {
        setTitle('');
        setDescription('');
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setSubmitting(true);
        setMessage('');

        try {
            await taskController.createTask({title, description});
            setMessage('Task added');
            clear();
            window.dispatchEvent(new Event('task:created'));
        } catch (err: any) {
            setMessage(err?.response?.data?.message || 'Failed to add task');
        } finally {
            setSubmitting(false);
            setTimeout(() => setMessage(''), 2000);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="w-full border rounded px-3 py-2"
                required
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                className="w-full border rounded px-3 py-2 h-28"
            />
            <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            >
                {submitting ? 'Adding...' : 'Add'}
            </button>
            {message && <div className="text-sm text-gray-600">{message}</div>}
        </form>
    );
}