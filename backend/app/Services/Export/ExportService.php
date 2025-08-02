<?php

namespace App\Services\Export;

use App\Models\Export;
use App\Jobs\ExportTasksJob;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;

class ExportService
{
    public function listUserExports(){
        $user = Auth::user();

        return Export::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get();
    }
    

    public function createExport(Request $request){
        $user = Auth::user();

        $export = Export::create([
            'user_id' => $user->id,
            'status' => 'pending',
            'filename' => null,
            'format' => $request->input('format', 'xlsx'),
        ]);

        ExportTasksJob::dispatch($export->id, $export->format);

        return $export;
    }


    public function downloadExport(int $id){
        $export = Export::findOrFail($id);

        if ($export->status !== 'done') {
            return response()->json(['error' => 'Arquivo ainda não disponível'], 400);
        }

        $path = "exports/{$export->filename}";

        if (!Storage::disk('local')->exists($path)) {
            return response()->json(['error' => 'Arquivo não encontrado'], 404);
        }

        return Storage::disk('local')->download($path);
    }

}
