<?php

namespace Database\Factories;

use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class TaskFactory extends Factory
{
    protected $model = Task::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'company_id' => function (array $attributes) {
                return User::find($attributes['user_id'])->company_id;
            },
            'title' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
            'status' => $this->faker->randomElement(['pendente', 'em andamento', 'concluída']),
            'priority' => $this->faker->randomElement(['baixa', 'média', 'alta']),
            'deadline' => $this->faker->dateTimeBetween('now', '+30 days'),
        ];
    }
}
