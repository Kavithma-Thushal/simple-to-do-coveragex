import axios from 'axios';
import {BASE_URL} from '../../config/api';
import {renderHook, act} from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import {vi, describe, it, beforeEach, expect} from 'vitest';
import CompleteTaskController from '../CompleteTaskController';

vi.mock('../../util/alert', () => ({
    successNotification: vi.fn(),
    errorNotification: vi.fn(),
}));

const {successNotification, errorNotification} = await import('../../util/alert');
const mockAxios = new MockAdapter(axios);

describe('CompleteTaskController', () => {
    const mockGetTasks = vi.fn();

    beforeEach(() => {
        mockAxios.reset();
        vi.clearAllMocks();
    });

    it('should complete a task', async () => {
        const taskId = 1;

        mockAxios.onPatch(`${BASE_URL}/task/${taskId}`).reply(200, {
            message: 'Task completed',
        });

        const {result} = renderHook(() => CompleteTaskController(mockGetTasks));

        await act(async () => {
            await result.current.completeTask(taskId);
        });

        expect(successNotification).toHaveBeenCalledWith('Task completed');
        expect(mockGetTasks).toHaveBeenCalled();
    });

    it('should handle complete task error', async () => {
        const taskId = 2;

        mockAxios.onPatch(`${BASE_URL}/task/${taskId}`).reply(500, {
            error: {message: ['Something went wrong']},
        });

        const {result} = renderHook(() => CompleteTaskController(mockGetTasks));

        await act(async () => {
            await result.current.completeTask(taskId);
        });

        expect(errorNotification).toHaveBeenCalled();
    });
});