import {useEffect} from 'react';
import TaskCard from './TaskCard';

interface Props {
    getTasksController: any;
}

export default function TaskList({getTasksController}: Props) {
    const {tasks, loading, getTasks} = getTasksController;

    useEffect(() => {
        // refresh tasks on create/complete events
        const createdHandler = () => getTasks();
        const completedHandler = () => getTasks();
        window.addEventListener('task:created', createdHandler);
        window.addEventListener('task:completed', completedHandler);

        return () => {
            window.removeEventListener('task:created', createdHandler);
            window.removeEventListener('task:completed', completedHandler);
        };
    }, []);

    if (loading) return <div>Loading...</div>;
    if (!tasks.length) return <div className="text-sm text-gray-500">No tasks yet</div>;

    return (
        <div className="space-y-4">
            {tasks.map((task: any) => (
                <TaskCard key={task.id} task={task}/>
            ))}
        </div>
    );
}