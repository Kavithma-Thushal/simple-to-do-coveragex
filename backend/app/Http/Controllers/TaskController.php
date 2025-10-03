<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TaskController extends Controller
{

    public function create(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        DB::beginTransaction();
        try {
            $task = Task::create($validated);
            DB::commit();

            return response()->json([
                'message' => 'Task added',
                'data' => $task
            ]);
        } catch (Exception $e) {
            DB::rollBack();
            throw new Exception($e);
        }
    }

    public function read()
    {
        DB::beginTransaction();
        try {
            $tasks = Task::where('completed', false)->orderBy('created_at', 'desc')->limit(5)->get();
            DB::commit();

            return response()->json([
                'data' => $tasks
            ]);
        } catch (Exception $e) {
            DB::rollBack();
            throw new Exception($e);
        }
    }

    public function update(Task $task)
    {
        DB::beginTransaction();
        try {
            $task->update(['completed' => true]);
            DB::commit();

            return response()->json([
                'message' => 'Task marked as completed',
                'data' => $task
            ]);
        } catch (Exception $e) {
            DB::rollBack();
            throw new Exception($e);
        }
    }
}
