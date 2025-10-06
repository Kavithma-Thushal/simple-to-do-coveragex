import axios from 'axios';
import {BASE_URL} from '../../config/api';
import {renderHook, act} from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import {vi, describe, it, beforeEach, expect} from 'vitest';
import AddTaskController from '../AddTaskController';

vi.mock('../../util/alert', () => ({
    successNotification: vi.fn(),
    errorNotification: vi.fn(),
}));

const {successNotification, errorNotification} = await import('../../util/alert');
const mockAxios = new MockAdapter(axios);

describe('AddTaskController', () => {
    const mockGetTasks = vi.fn();
    beforeEach(() => {
        mockAxios.reset();
        vi.clearAllMocks();
    });

    it('should add a task', async () => {
        mockAxios.onPost(`${BASE_URL}/task/add`).reply(200, {
            message: 'Task added',
            data: {id: 1, title: 'Test Title', description: 'Test Description', complete: false},
        });
        const {result} = renderHook(() => AddTaskController(mockGetTasks));
        act(() => {
            result.current.handleChange({target: {name: 'title', value: 'Test Title'}});
            result.current.handleChange({target: {name: 'description', value: 'Test Description'}});
        });
        await act(async () => {
            await result.current.createTask({
                preventDefault: () => {
                }
            });
        });
        expect(successNotification).toHaveBeenCalledWith('Task added');
        expect(mockGetTasks).toHaveBeenCalled();
    });

    it('should handle add task error', async () => {
        mockAxios.onPost(`${BASE_URL}/task/add`).reply(400, {
            error: {title: ['Title is required']},
        });
        const {result} = renderHook(() => AddTaskController(mockGetTasks));
        await act(async () => {
            await result.current.createTask({
                preventDefault: () => {
                }
            });
        });
        expect(errorNotification).toHaveBeenCalled();
    });
});