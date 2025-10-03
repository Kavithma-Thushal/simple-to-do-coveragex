import TaskCard from './TaskCard';
import GetTasksController from '../../controllers/GetTasksController';

export default function TaskList() {
    const {tasks} = GetTasksController();

    if (!tasks.length) {
        return (
            <div className="text-sm text-gray-500">
                No tasks yet
            </div>
        );
    } else {
        return (
            <div className="space-y-4">
                {tasks.map((task: any) => (
                    <TaskCard key={task.id} task={task}/>
                ))}
            </div>
        );
    }
}