import CompleteTaskController from '../../controllers/CompleteTaskController';

interface Props {
    task: any;
    getTasks: () => void;
}

export default function TaskCard({task, getTasks}: Props) {
    const {completeTask} = CompleteTaskController(getTasks);

    return (
        <div className="bg-gray-100 rounded-md p-4 shadow-inner flex justify-between items-center">
            <div>
                <div className="font-semibold">{task.title}</div>
                {task.description && <div className="text-sm text-gray-600 mt-1">{task.description}</div>}
            </div>
            <button
                onClick={() => completeTask(task.id)}
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded">
                Done
            </button>
        </div>
    );
}