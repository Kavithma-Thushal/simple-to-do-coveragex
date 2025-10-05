<?php

namespace Tests\Unit;

use App\Http\Services\TaskService;
use App\Repositories\Task\TaskRepositoryInterface;
use App\Models\Task;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaskServiceTest extends TestCase
{
    use RefreshDatabase;

    protected TaskService $taskService;

    protected function setUp(): void
    {
        parent::setUp();
        $repository = $this->app->make(TaskRepositoryInterface::class);
        $this->taskService = new TaskService($repository);
    }

    public function test_add_task()
    {
        $data = ['title' => 'Test Title', 'description' => 'Test Description'];
        $task = $this->taskService->add($data);
        $this->assertDatabaseHas('tasks', [
            'id' => $task->id,
            'title' => 'Test Title',
            'description' => 'Test Description',
            'complete' => false,
        ]);
    }

    public function test_complete_task()
    {
        $task = Task::factory()->create(['complete' => false]);
        $completed = $this->taskService->complete($task->id);
        $this->assertTrue($completed->complete);
        $this->assertDatabaseHas('tasks', [
            'id' => $task->id,
            'complete' => true,
        ]);
    }
}
