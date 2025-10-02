import axios from 'axios';
import {BASE_URL} from '../config/api';
import {useState, useEffect} from 'react';

export default function GetTasksController() {
    const [tasks, setTasks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const getTasks = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${BASE_URL}/get`);
            setTasks(res.data.data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getTasks();
        const createdHandler = () => getTasks();
        const completedHandler = () => getTasks();
        window.addEventListener('task:created', createdHandler);
        window.addEventListener('task:completed', completedHandler);

        return () => {
            window.removeEventListener('task:created', createdHandler);
            window.removeEventListener('task:completed', completedHandler);
        };
    }, []);

    return {
        tasks,
        loading,
        getTasks,
    };
}