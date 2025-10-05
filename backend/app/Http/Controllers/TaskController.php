<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TaskController extends Controller
{

    public function add(Request $request)
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

    public function getAll()
    {
        DB::beginTransaction();
        try {
            $tasks = Task::where('complete', false)->orderBy('created_at', 'desc')->limit(5)->get();
            DB::commit();

            return response()->json([
                'data' => $tasks
            ]);
        } catch (Exception $e) {
            DB::rollBack();
            throw new Exception($e);
        }
    }

    public function complete($id)
    {
        DB::beginTransaction();
        try {
            $task = Task::findOrFail($id);
            $task->update(['complete' => true]);
            DB::commit();

            return response()->json([
                'message' => 'Task completed',
                'data' => $task
            ]);
        } catch (Exception $e) {
            DB::rollBack();
            throw new Exception($e);
        }
    }
}
