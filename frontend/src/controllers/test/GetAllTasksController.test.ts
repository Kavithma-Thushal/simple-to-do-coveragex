import axios from 'axios';
import {BASE_URL} from '../../config/api';
import {renderHook, waitFor} from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import {vi, describe, it, beforeEach, expect} from 'vitest';
import GetAllTasksController from '../GetAllTasksController';

vi.mock('../../util/alert', () => ({
    errorNotification: vi.fn(),
}));

const {errorNotification} = await import('../../util/alert');
const mockAxios = new MockAdapter(axios);

describe('GetAllTasksController', () => {
    beforeEach(() => {
        mockAxios.reset();
        vi.clearAllMocks();
    });

    it('should getAll tasks', async () => {
        const mockTasks = [
            {id: 1, title: 'Test Title 1', description: 'Test Description 1'},
            {id: 2, title: 'Test Title 2', description: 'Test Description 2'},
        ];
        mockAxios.onGet(`${BASE_URL}/task/getAll`).reply(200, {data: mockTasks});
        const {result} = renderHook(() => GetAllTasksController());
        await waitFor(() => {
            expect(result.current.tasks).toEqual(mockTasks);
        });
    });

    it('should handle getAll tasks error', async () => {
        mockAxios.onGet(`${BASE_URL}/task/getAll`).reply(500, {
            error: {message: ['Something went wrong']},
        });
        renderHook(() => GetAllTasksController());
        await waitFor(() => {
            expect(errorNotification).toHaveBeenCalled();
        });
    });
});