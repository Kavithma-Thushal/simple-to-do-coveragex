import axios from 'axios';
import {BASE_URL} from '../config/api';
import {useState, useEffect} from 'react';
import {errorNotification} from "../util/alert.ts";

export default function GetAllTaskController() {
    const [tasks, setTasks] = useState<any[]>([]);

    const getTasks = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/task/getAll`);
            setTasks(response.data.data);
        } catch (error: any) {
            errorNotification(Object.values(error.response.data.error));
        }
    };

    useEffect(() => {
        getTasks();
    }, []);

    return {
        tasks,
        getTasks,
    };
}