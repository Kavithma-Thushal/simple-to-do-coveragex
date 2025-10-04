import CompleteTaskController from '../../controllers/CompleteTaskController';

interface Props {
    task: any;
    getTasks: () => void;
}

export default function TaskCard({task, getTasks}: Props) {
    const {completeTask} = CompleteTaskController(getTasks);

    return (
        <div className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-sm">
            <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">{task.title}</h3>
                {task.description && (<p className="text-sm text-gray-600 dark:text-gray-300">{task.description}</p>)}
            </div>
            <button
                onClick={() => completeTask(task.id)}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 dark:hover:bg-blue-500">
                Done
            </button>
        </div>
    );
}