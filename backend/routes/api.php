<?php

use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;

Route::prefix('task')->group(function () {
    Route::post('create', [TaskController::class, 'create']);
    Route::get('read', [TaskController::class, 'read']);
    Route::patch('{task}', [TaskController::class, 'update']);
});
