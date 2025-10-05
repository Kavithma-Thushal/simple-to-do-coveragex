<?php

namespace App\Http\Controllers;

use App\Classes\ErrorResponse;
use App\Http\Requests\TaskRequest;
use App\Http\Resources\SuccessResource;
use App\Http\Resources\TaskResource;
use App\Http\Services\TaskService;
use Symfony\Component\HttpKernel\Exception\HttpException;

class TaskController extends Controller
{
    protected TaskService $taskService;

    public function __construct(TaskService $taskService)
    {
        $this->taskService = $taskService;
    }

    public function add(TaskRequest $request)
    {
        try {
            $task = $this->taskService->add($request->validated());
            return new SuccessResource([
                'message' => 'Task added',
                'data' => new TaskResource($task)
            ]);
        } catch (HttpException $e) {
            ErrorResponse::throwException($e);
        }
    }

    public function getAll()
    {
        try {
            $tasks = $this->taskService->getAll();
            return new SuccessResource([
                'data' => TaskResource::collection($tasks)
            ]);
        } catch (HttpException $e) {
            ErrorResponse::throwException($e);
        }
    }

    public function complete($id)
    {
        try {
            $task = $this->taskService->complete($id);
            return new SuccessResource([
                'message' => 'Task completed',
                'data' => new TaskResource($task)
            ]);
        } catch (HttpException $e) {
            ErrorResponse::throwException($e);
        }
    }
}
