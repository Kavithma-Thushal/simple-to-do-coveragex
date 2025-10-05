<?php

namespace App\Repositories\Task;

use App\Models\Task;
use App\Repositories\CrudRepository;

class TaskRepository extends CrudRepository implements TaskRepositoryInterface
{
    public function __construct(Task $model)
    {
        parent::__construct($model);
    }
}
