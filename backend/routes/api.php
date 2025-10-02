<?php

use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;

Route::prefix('task')->group(function () {
    Route::post('add', [TaskController::class, 'add']);
});
