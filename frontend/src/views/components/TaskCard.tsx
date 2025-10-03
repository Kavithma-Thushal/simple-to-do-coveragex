import CompleteTaskController from '../../controllers/CompleteTaskController';

interface Props {
    task: any;
}

export default function TaskCard({task}: Props) {
    const {completeTask} = CompleteTaskController();

    return (
        <div className="bg-gray-100 rounded-md p-4 shadow-inner flex justify-between items-center">
            <div>
                <div className="font-semibold">{task.title}</div>
                {task.description && <div className="text-sm text-gray-600 mt-1">{task.description}</div>}
            </div>
            <button
                onClick={() => completeTask(task.id)}
                className="px-3 py-1 border rounded text-sm hover:bg-gray-200">
                Done
            </button>
        </div>
    );
}