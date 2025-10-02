import axios from 'axios';
import {BASE_URL} from '../config/api';
import {useState} from 'react';
import {successNotification, errorNotification} from '../util/alert';

export default function CreateTaskController() {
    const [form, setForm] = useState({title: '', description: ''});
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e: any) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const createTask = async (e: any) => {
        e.preventDefault();
        setSubmitting(true);
        setMessage('');
        try {
            const response = await axios.post(`${BASE_URL}/create`, form);
            successNotification(response.data.message);
            setMessage('Task added successfully');
            setForm({title: '', description: ''});
            // notify TaskList to refresh
            window.dispatchEvent(new Event('task:created'));
        } catch (err: any) {
            errorNotification(err?.response?.data?.message || 'Failed to add task');
        } finally {
            setSubmitting(false);
            setTimeout(() => setMessage(''), 2000);
        }
    };

    return {
        form,
        handleChange,
        createTask,
        submitting,
        message,
    };
}