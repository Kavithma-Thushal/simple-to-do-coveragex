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
        $data = ['title' => 'UnitTest Title', 'description' => 'UnitTest Description'];
        $task = $this->taskService->add($data);
        $this->assertDatabaseHas('tasks', [
            'id' => $task->id,
            'title' => $data['title'],
            'description' => $data['description'],
            'complete' => false,
        ]);
    }

    public function test_get_all_tasks()
    {
        Task::factory()->count(5)->create(['complete' => false]);
        Task::factory()->count(2)->create(['complete' => true]);
        $tasks = $this->taskService->getAll();
        $this->assertCount(5, $tasks);
        foreach ($tasks as $task) {
            $this->assertEquals(false, (bool)$task->complete);
        }
        $dates = $tasks->pluck('created_at')->toArray();
        $sortedDates = $dates;
        rsort($sortedDates);
        $this->assertEquals($sortedDates, $dates);
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
