import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import GetTasksController from '../../controllers/GetTasksController';

export default function Home() {
    const {tasks, getTasks} = GetTasksController();

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
            <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-8 grid grid-cols-2 gap-6">
                <div>
                    <h2 className="text-xl font-semibold mb-4">Add a Task</h2>
                    <TaskForm getTasks={getTasks}/>
                </div>
                <div className="border-l pl-8">
                    <h2 className="text-xl font-semibold mb-4">Recent Tasks</h2>
                    <TaskList tasks={tasks} getTasks={getTasks}/>
                </div>
            </div>
        </div>
    );
}