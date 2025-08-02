<?php

namespace App\Jobs;

use App\Exports\TasksExport;
use App\Models\Export;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Log;

class ExportTasksJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $exportId;
    protected $format;

    public function __construct(int $exportId, string $format = 'xlsx')
    {
        $this->exportId = $exportId;
        $this->format = $format;
    }

    public function handle()
    {
        $export = Export::find($this->exportId);
        if (!$export) {
            Log::error("Export with ID {$this->exportId} not found.");
            return;
        }

        $userId = $export->user_id;
        $filename = "tasks_export_{$userId}_" . now()->format('Ymd_His') . "." . $this->format;

        try {
            Excel::store(
                new TasksExport($userId),
                "exports/{$filename}",
                'local',
                $this->format === 'csv' ? \Maatwebsite\Excel\Excel::CSV : \Maatwebsite\Excel\Excel::XLSX
            );

            $export->update([
                'filename' => $filename,
                'status' => 'done',
            ]);
        } catch (\Exception $e) {
            Log::error('ExportTasksJob failed: ' . $e->getMessage());
            $export->update(['status' => 'failed']);
        }
    }
}
