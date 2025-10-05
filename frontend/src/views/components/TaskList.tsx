import TaskCard from './TaskCard';

interface Props {
    tasks: any[];
    getTasks: () => void;
}

export default function TaskList({tasks, getTasks}: Props) {
    if (!tasks.length) {
        return <div className="text-lg font-medium text-gray-500 dark:text-gray-400">🎉 Yeeee... you are free now!</div>;
    }

    return (
        <div className="space-y-4">
            {tasks.map((task: any) => (
                <TaskCard key={task.id} task={task} getTasks={getTasks}/>
            ))}
        </div>
    );
}