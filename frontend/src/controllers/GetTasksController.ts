import axios from 'axios';
import {BASE_URL} from '../config/api';
import {useState, useEffect} from 'react';
import {errorNotification} from "../util/alert.ts";

export default function GetTasksController() {
    const [tasks, setTasks] = useState<any[]>([]);

    const getTasks = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/task/read`);
            setTasks(res.data.data || []);
        } catch (error: any) {
            errorNotification(Object.values(error.response.data.error));
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
        tasks
    };
}