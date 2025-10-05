import CompleteTaskController from '../../controllers/CompleteTaskController';

interface Props {
    task: any;
    getTasks: () => void;
}

export default function TaskCard({task, getTasks}: Props) {
    const {completeTask} = CompleteTaskController(getTasks);

    return (
        <div
            className="flex justify-between items-center bg-white/80 dark:bg-gray-700/70 border border-gray-200 dark:border-gray-600 p-4 rounded-xl shadow-sm hover:shadow-lg hover:scale-[1.01] transition-all duration-300 backdrop-blur-sm">

            <div className="pr-4">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-1">
                    {task.title}
                </h3>
                {task.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 italic">
                        {task.description}
                    </p>
                )}
            </div>

            <button onClick={() => completeTask(task.id)}
                    className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300">
                Done
            </button>
        </div>
    );
}