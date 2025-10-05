<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Task;
use Illuminate\Foundation\Testing\RefreshDatabase;

class TaskApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_add_task_api()
    {
        $response = $this->postJson('/api/task/add', [
            'title' => 'Integration Task',
            'description' => 'Integration Test',
        ]);
        $response->assertStatus(200)
            ->assertJsonStructure([
                'message', 'data' => ['id', 'title', 'description', 'complete']
            ]);
        $this->assertDatabaseHas('tasks', ['title' => 'Integration Task']);
    }

    public function test_get_all_tasks_api()
    {
        Task::factory()->count(3)->create();
        $response = $this->getJson('/api/task/getAll');
        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => ['id', 'title', 'description', 'complete', 'created_at', 'updated_at']
                ]
            ]);
        $this->assertCount(3, $response->json('data'));
    }

    public function test_complete_task_api()
    {
        $task = Task::factory()->create();
        $response = $this->patchJson("/api/task/{$task->id}");
        $response->assertStatus(200)->assertJson(['message' => 'Task completed']);
        $this->assertDatabaseHas('tasks', ['id' => $task->id, 'complete' => true]);
    }
}
