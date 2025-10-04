import axios from 'axios';
import {BASE_URL} from '../config/api';
import {successNotification, errorNotification} from '../util/alert';

export default function CompleteTaskController(getTasks?: () => void) {
    const completeTask = async (id: number) => {
        try {
            const response = await axios.patch(`${BASE_URL}/task/${id}`);
            successNotification(response.data.message);
            if (getTasks) getTasks();
        } catch (error: any) {
            errorNotification(Object.values(error.response.data.error));
        }
    };

    return {
        completeTask,
    };
}