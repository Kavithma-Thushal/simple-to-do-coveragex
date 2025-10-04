import TaskCard from './TaskCard';

interface Props {
    tasks: any[];
    getTasks: () => void;
}

export default function TaskList({tasks, getTasks}: Props) {
    if (!tasks.length) {
        return <div className="text-sm text-gray-500">No tasks yet</div>;
    }

    return (
        <div className="space-y-4">
            {tasks.map((task: any) => (
                <TaskCard key={task.id} task={task} getTasks={getTasks}/>
            ))}
        </div>
    );
}