<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class TaskFactory extends Factory
{

    public function definition(): array
    {
        return [
            'title' => fake()->sentence(3),
            'description' => fake()->paragraph(),
            'complete' => false,
        ];
    }

    public function completed(): static
    {
        return $this->state(fn(array $attributes) => [
            'complete' => true,
        ]);
    }
}
