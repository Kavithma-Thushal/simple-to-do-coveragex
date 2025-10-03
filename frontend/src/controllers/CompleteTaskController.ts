import axios from 'axios';
import {BASE_URL} from '../config/api';
import {successNotification, errorNotification} from '../util/alert';

export default function CompleteTaskController() {
    const completeTask = async (id: number) => {
        try {
            const response = await axios.patch(`${BASE_URL}/task/${id}`);
            successNotification(response.data.message);
        } catch (error: any) {
            errorNotification(Object.values(error.response.data.error));
        }
    };

    return {
        completeTask,
    };
}