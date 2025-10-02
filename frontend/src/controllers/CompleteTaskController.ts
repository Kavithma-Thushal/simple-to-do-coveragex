import axios from 'axios';
import {BASE_URL} from '../config/api';
import {useState} from 'react';
import {successNotification, errorNotification} from '../util/alert';

export default function CompleteTaskController() {
    const [processing, setProcessing] = useState(false);

    const completeTask = async (id: number) => {
        setProcessing(true);
        try {
            await axios.patch(`${BASE_URL}/${id}`);
            successNotification('Task marked as completed');
            window.dispatchEvent(new Event('task:completed'));
        } catch (err: any) {
            errorNotification(err?.response?.data?.message || 'Failed to mark task done');
        } finally {
            setProcessing(false);
        }
    };

    return {
        processing,
        completeTask,
    };
}