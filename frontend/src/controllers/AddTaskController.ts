import axios from 'axios';
import {BASE_URL} from '../config/api';
import {useState} from 'react';
import {successNotification, errorNotification} from '../util/alert';

export default function AddTaskController(getTasks?: () => void) {
    const [form, setForm] = useState({title: '', description: ''});

    const handleChange = (e: any) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const createTask = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/task/add`, form);
            successNotification(response.data.message);
            setForm({title: '', description: ''});
            if (getTasks) getTasks();
        } catch (error: any) {
            errorNotification(Object.values(error.response.data.error));
        }
    };

    return {
        form,
        handleChange,
        createTask,
    };
}