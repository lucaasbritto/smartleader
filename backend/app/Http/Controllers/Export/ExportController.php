<?php
namespace App\Http\Controllers\Export;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\Export\ExportService;

class ExportController extends Controller
{

     protected $exportService;

    public function __construct(ExportService $exportService){
        $this->exportService = $exportService;
    }


     public function index(){
        $exports = $this->exportService->listUserExports();
        return response()->json($exports);
    }

    public function store(Request $request){
        $this->exportService->createExport($request);
        return response()->json(['message' => 'Exportação iniciada.'], 202);
    }


    public function download($id){
        return $this->exportService->downloadExport($id);
    }
}
