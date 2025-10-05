<?php

namespace App\Http\Services;

use App\Repositories\Task\TaskRepositoryInterface;
use Exception;
use Illuminate\Support\Facades\DB;

class TaskService
{
    protected TaskRepositoryInterface $taskRepositoryInterface;

    public function __construct(TaskRepositoryInterface $taskRepositoryInterface)
    {
        $this->taskRepositoryInterface = $taskRepositoryInterface;
    }

    public function add(array $data)
    {
        DB::beginTransaction();
        try {
            $task = $this->taskRepositoryInterface->create($data);
            DB::commit();
            return $task;
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function getAll()
    {
        DB::beginTransaction();
        try {
            $tasks = $this->taskRepositoryInterface->findAll()->where('complete', false)->sortByDesc('created_at')->take(5);
            DB::commit();
            return $tasks;
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function complete(int $id)
    {
        DB::beginTransaction();
        try {
            $task = $this->taskRepositoryInterface->update(['complete' => true], $id);
            DB::commit();
            return $task;
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
